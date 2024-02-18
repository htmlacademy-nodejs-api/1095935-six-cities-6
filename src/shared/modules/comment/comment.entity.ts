import {
  Ref,
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { Date } from "mongoose";

import { UserEntity } from "../user/index.js";
import { OfferEntity } from "../offer/index.js";

import { COMMENT_LENGTH, COMMENT_RATING } from "./comment.constants.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: "comments",
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public publishDate: Date;

  @prop({
    required: true,
    trim: true,
    minlength: COMMENT_LENGTH.MIN,
    maxlength: COMMENT_LENGTH.MAX,
  })
  public text: string;

  @prop({ required: true, min: COMMENT_RATING.MIN, max: COMMENT_RATING.MAX })
  public rating: number;

  @prop({ required: true, ref: UserEntity })
  public authorId: Ref<UserEntity>;

  @prop({ required: true, ref: OfferEntity })
  public offerId: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
