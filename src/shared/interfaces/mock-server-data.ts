import { IOfferLocation } from "./offer.js";

export interface IMockServerData {
  titles: string[];
  descriptions: string[];
  citys: string[];
  preview: string;
  image: string;
  entires: string[];
  features: string[];
  names: string[];
  emails: string[];
  avatar: string;
  passwords: string[];
  locations: IOfferLocation[];
}
