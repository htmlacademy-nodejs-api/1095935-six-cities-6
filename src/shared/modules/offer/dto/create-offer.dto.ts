import {
  IOfferLocation,
  TOfferEntire,
  TOfferFeature,
  TCity,
} from "../../../interfaces/index.js";

export class CreateOfferDto {
  authorId: string;
  title: string;
  description: string;
  publishDate: string;
  city: TCity;
  preview: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  entire: TOfferEntire;
  bedrooms: number;
  adults: number;
  price: number;
  features: TOfferFeature[];
  reviewsAmount: number;
  location: IOfferLocation;
}
