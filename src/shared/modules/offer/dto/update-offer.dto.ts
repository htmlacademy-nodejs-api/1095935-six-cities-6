import {
  IOfferLocation,
  TOfferEntire,
  TOfferFeature,
  TCity,
} from "../../../interfaces/index.js";

export class UpdateOfferDto {
  authorId?: string;
  title?: string;
  description?: string;
  publishDate?: string;
  city?: TCity;
  preview?: string;
  images?: string[];
  isPremium?: boolean;
  entire?: TOfferEntire;
  bedrooms?: number;
  adults?: number;
  price?: number;
  features?: TOfferFeature[];
  location?: IOfferLocation;
}
