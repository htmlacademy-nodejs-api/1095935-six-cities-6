import { inject, injectable } from "inversify";
import { DocumentType, types } from "@typegoose/typegoose";

import { Component } from "../../interfaces/index.js";
import { ILogger } from "../../libs/logger/index.js";
import { SortType } from "../../interfaces/index.js";

import { CreateCommentDto } from "./dto/index.js";

import { ICommentService } from "./comment-service.interface.js";
import { CommentEntity } from "./comment.entity.js";
import { DEFAULT_COMMENTS_AMOUNT } from "./comment.constants.js";

@injectable()
export class DefaultCommentService implements ICommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(
    dto: CreateCommentDto
  ): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);

    this.logger.info(`Новый комментарий создан: ${dto.text}`);
    return result.populate("authorId");
  }

  public async findByOfferId(
    offerId: string
  ): Promise<DocumentType<CommentEntity>[]> {
    const result = await this.commentModel
      .find({ offerId })
      .limit(DEFAULT_COMMENTS_AMOUNT)
      .sort({ createdAt: SortType.Down })
      .populate("authorId")
      .exec();

    this.logger.info(`Комментариев найдено: ${result.length}`);
    return result;
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    const result = await this.commentModel.deleteMany({ offerId }).exec();

    this.logger.info(`Комментариев удалено: ${result.deletedCount}`);
    return result.deletedCount;
  }
}
