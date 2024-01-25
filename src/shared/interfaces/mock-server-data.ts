import { IOfferLocation } from "./offer.js";

export interface IMockServerData {
  titles: string[];
  descriptions: string[];
  cities: {
    name: string;
    locations: IOfferLocation;
  }[];
  preview: string;
  image: string;
  entires: string[];
  features: string[];
  names: string[];
  emails: string[];
  avatar: string;
  passwords: string[];
}
