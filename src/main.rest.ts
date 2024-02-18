import "reflect-metadata";
import { Container } from "inversify";

import { Component } from "./shared/interfaces/index.js";
import { createUserContainer } from "./shared/modules/user/index.js";
import { createOfferContainer } from "./shared/modules/offer/index.js";
import { createCommentContainer } from "./shared/modules/comment/index.js";

import {
  RestApplication,
  createRestApplicationContainer,
} from "./rest/index.js";

const bootstrap = async () => {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer()
  );

  const application = appContainer.get<RestApplication>(
    Component.RestApplication
  );
  await application.init();
};

bootstrap();
