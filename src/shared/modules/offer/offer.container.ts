import { Container } from "inversify";
import { types } from "@typegoose/typegoose";

import { Component } from "../../interfaces/component.enum.js";

import { IOfferService } from "./offer-service.interface.js";
import { OfferService } from "./offer.service.js";
import { OfferEntity, OfferModel } from "./offer.entity.js";

export const createOfferContainer = () => {
  const offerContainer = new Container();

  offerContainer.bind<IOfferService>(Component.OfferService).to(OfferService);
  offerContainer
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);

  return offerContainer;
};
