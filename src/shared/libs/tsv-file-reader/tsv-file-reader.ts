import { readFileSync } from "node:fs";

import {
  IOffer,
  IOfferLocation,
  IUser,
  TOfferEntire,
  TOfferFeature,
  TUserStatus,
} from "../../../shared/interfaces/index.js";
import { IFileReader } from "./tsv-file-reader.interface.js";

export class TSVFileReader implements IFileReader {
  private rawData = "";

  constructor(private readonly filename: string) {}

  private parseLocation(location: string): IOfferLocation {
    const [latitude, longitude] = location.split(";");
    return {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };
  }

  private parseAuthor(author: string): IUser {
    const [name, email, avatar, password, status] = author.split(";");
    return {
      name,
      email,
      avatar,
      password,
      status: status as TUserStatus,
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, "utf-8");
  }

  public toArray(): IOffer[] {
    if (!this.rawData) {
      throw new Error("Не удалось прочитать файл");
    }

    return this.rawData
      .split("\n")
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split("\t"))
      .map(
        ([
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
        ]) => ({
          title,
          description,
          publishDate,
          city,
          preview,
          images: images.split(" "),
          isPremium: isPremium === "true",
          isFavorite: isFavorite === "true",
          rating: Number(rating),
          entire: entire as TOfferEntire,
          bedrooms: Number(bedrooms),
          adults: Number(adults),
          price: Number(price),
          features: features.split(" ") as TOfferFeature[],
          author: this.parseAuthor(author),
          reviewsAmount: Number(reviewsAmount),
          location: this.parseLocation(location),
        })
      );
  }
}
