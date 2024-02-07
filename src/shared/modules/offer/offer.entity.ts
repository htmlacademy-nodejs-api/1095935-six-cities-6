import {
  Ref,
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";

import {
  IOfferLocation,
  TCity,
  TOfferEntire,
  TOfferFeature,
} from "../../interfaces/index.js";
import { UserEntity } from "../user/index.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: "offers",
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    ref: UserEntity,
    required: true,
  })
  public authorId: Ref<UserEntity>;

  @prop({ required: true, minlength: 10, maxlength: 100 })
  public title: string;

  @prop({ required: true, minlength: 20, maxlength: 1024 })
  public description: string;

  @prop({ required: true })
  public publishDate: Date;

  @prop({ required: true })
  public city: TCity;

  @prop({ required: true })
  public preview: string;

  @prop({ required: true, default: [] })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({ required: true, min: 1, max: 8 })
  public rating: number;

  @prop({ required: true })
  public entire: TOfferEntire;

  @prop({ required: true, min: 1, max: 8 })
  public bedrooms: number;

  @prop({ required: true, min: 1, max: 10 })
  public adults: number;

  @prop({ required: true, min: 100, max: 100_000 })
  public price: number;

  @prop({ required: true, default: [] })
  public features: TOfferFeature[];

  @prop({ required: true, default: 0 })
  public reviewsAmount: number;

  @prop({ required: true })
  public location: IOfferLocation;
}

export const OfferModel = getModelForClass(OfferEntity);
