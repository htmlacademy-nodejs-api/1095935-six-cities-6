import { DocumentType } from "@typegoose/typegoose";

import { OfferEntity } from "./offer.entity.js";
import { CreateOfferDto } from "./dto/index.js";

export interface IOfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
}
