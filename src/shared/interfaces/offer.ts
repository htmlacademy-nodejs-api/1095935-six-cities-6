import { IUser } from "./user.js";

export type TOfferEntire = "apartment" | "house" | "room" | "hotel";

export type TOfferFeature =
  | "Breakfast"
  | "Air conditioning"
  | "Laptop friendly workspace"
  | "Baby seat"
  | "Washer"
  | "Towels"
  | "Fridge";

export type TCity =
  | "Paris"
  | "Cologne"
  | "Brussels"
  | "Amsterdam"
  | "Hamburg"
  | "Dusseldorf";

export interface IOfferLocation {
  latitude: number;
  longitude: number;
}

export interface IOffer {
  author: IUser;
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
