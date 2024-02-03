import { inject, injectable } from "inversify";
import { DocumentType, types } from "@typegoose/typegoose";

import { Component } from "../../interfaces/index.js";
import { ILogger } from "../../libs/logger/index.js";

import { IOfferService } from "./offer-service.interface.js";
import { OfferEntity } from "./offer.entity.js";
import { CreateOfferDto } from "./index.js";

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
    return this.offerModel.findById(offerId).exec();
  }
}
