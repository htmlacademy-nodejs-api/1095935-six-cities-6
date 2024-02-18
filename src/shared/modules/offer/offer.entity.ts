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

import {
  OFFER_ADULTS,
  OFFER_BEDROOMS,
  OFFER_DESCRIPTION_LENGTH,
  OFFER_PRICE,
  OFFER_RATING,
  OFFER_TITLE_LENGTH,
} from "./offer.constants.js";

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

  @prop({
    required: true,
    minlength: OFFER_TITLE_LENGTH.MIN,
    maxlength: OFFER_TITLE_LENGTH.MAX,
  })
  public title: string;

  @prop({
    required: true,
    minlength: OFFER_DESCRIPTION_LENGTH.MIN,
    maxlength: OFFER_DESCRIPTION_LENGTH.MAX,
  })
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

  @prop({ required: true, min: OFFER_RATING.MIN, max: OFFER_RATING.MAX })
  public rating: number;

  @prop({ required: true })
  public entire: TOfferEntire;

  @prop({ required: true, min: OFFER_BEDROOMS.MIN, max: OFFER_BEDROOMS.MAX })
  public bedrooms: number;

  @prop({ required: true, min: OFFER_ADULTS.MIN, max: OFFER_ADULTS.MAX })
  public adults: number;

  @prop({ required: true, min: OFFER_PRICE.MIN, max: OFFER_PRICE.MAX })
  public price: number;

  @prop({ required: true, default: [] })
  public features: TOfferFeature[];

  @prop({ required: true, default: 0 })
  public reviewsAmount: number;

  @prop({ required: true })
  public location: IOfferLocation;
}

export const OfferModel = getModelForClass(OfferEntity);
