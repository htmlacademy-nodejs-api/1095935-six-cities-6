import { DocumentType } from "@typegoose/typegoose";

import { CreateOfferDto, UpdateOfferDto } from "./dto/index.js";

import { OfferEntity } from "./offer.entity.js";

export interface IOfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  getAll(): Promise<DocumentType<OfferEntity>[]>;
  getPremium(): Promise<DocumentType<OfferEntity>[]>;

  incrementCommentCount(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null>;
  isExists(documentId: string): Promise<boolean>;
}
