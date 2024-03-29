import dayjs from "dayjs";

import {
  getRandomItem,
  getRandomItems,
  getRandomeNumber,
} from "../../utils/index.js";
import { IMockServerData } from "../../interfaces/index.js";

import { IOfferGenerator } from "./tsv-offer-generator.interface.js";

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: IMockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const publishDate = dayjs()
      .subtract(getRandomeNumber(FIRST_WEEK_DAY, LAST_WEEK_DAY), "day")
      .toISOString();

    const preview = this.mockData.preview;
    const images = new Array(getRandomeNumber())
      .fill("")
      .map(() => this.mockData.image)
      .join(";");
    const isPremium = Math.random() > 0.5;
    const isFavorite = Math.random() > 0.5;
    const rating = getRandomeNumber(1, 5);
    const entire = getRandomItem(this.mockData.entires);
    const bedrooms = getRandomeNumber(1, 8);
    const adults = getRandomeNumber(1, 10);
    const price = getRandomeNumber(MIN_PRICE, MAX_PRICE);
    const features = getRandomItems(this.mockData.features).join(";");
    const reviewsAmount = getRandomeNumber();

    const {
      name: city,
      locations: { latitude, longitude },
    } = getRandomItem(this.mockData.cities);
    const location = `${latitude};${longitude}`;

    const name = getRandomItem(this.mockData.names);
    const email = getRandomItem(this.mockData.emails);
    const password = getRandomItem(this.mockData.passwords);
    const status = Math.random() > 0.5 ? "regular" : "pro";
    const author = [name, email, this.mockData.avatar, password, status].join(
      ";"
    );

    return [
      title,
      description,
      publishDate,
      city,
      preview,
      images,
      isPremium,
      isFavorite,
      rating,
      entire,
      bedrooms,
      adults,
      price,
      features,
      author,
      reviewsAmount,
      location,
    ].join("\t");
  }
}
