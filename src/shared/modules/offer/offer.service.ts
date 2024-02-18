import { inject, injectable } from "inversify";
import { DocumentType, types } from "@typegoose/typegoose";

import { Component, SortType } from "../../interfaces/index.js";
import { ILogger } from "../../libs/logger/index.js";

import { CreateOfferDto, UpdateOfferDto } from "./dto/index.js";

import { IOfferService } from "./offer-service.interface.js";
import { OfferEntity } from "./offer.entity.js";
import {
  DEFAULT_OFFER_AMOUNT,
  DEFAULT_PREMIUM_OFFER_AMOUNT,
} from "./offer.constants.js";

@injectable()
export class OfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);

    this.logger.info(`Новое объявление создано: ${dto.title}`);
    return result;
  }

  public async findById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(["auhorId"]).exec();
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate("auhorId")
      .exec();
  }

  public async deleteById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async getAll(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: "comments",
            let: { offerId: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$$offerId", "$offerId"] } } },
              {
                $group: {
                  _id: null,
                  averageRating: { $avg: "$rating" },
                  reviewsAmount: { $sum: 1 },
                },
              },
            ],
            as: "comments",
          },
        },
        {
          $addFields: {
            reviewsAmount: { $arrayElemAt: ["$comments.reviewsAmount", 0] },
            rating: { $arrayElemAt: ["$comments.averageRating", 0] },
          },
        },
        { $unset: "comments" },
        { $limit: DEFAULT_OFFER_AMOUNT },
      ])
      .exec();
  }

  public async getPremium(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ isPremium: true })
      .limit(DEFAULT_PREMIUM_OFFER_AMOUNT)
      .sort({ publishDate: SortType.Down })
      .exec();
  }

  public async incrementCommentCount(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $inc: { reviewsAmount: 1 },
      })
      .exec();
  }

  public async isExists(documentId: string): Promise<boolean> {
    const result = await this.offerModel.exists({ _id: documentId });
    return result !== null;
  }
}
