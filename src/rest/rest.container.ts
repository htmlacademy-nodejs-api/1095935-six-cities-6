import { Container } from "inversify";

import { Component } from "../shared/interfaces/index.js";
import { Logger, ILogger } from "../shared/libs/logger/index.js";

import {
  IConfig,
  RestConfig,
  IRestSchema,
} from "../shared/libs/config/index.js";

import {
  IDatabaseClient,
  MongoDatabaseClient,
} from "../shared/libs/database-client/index.js";

import { RestApplication } from "./rest.application.js";

export const createRestApplicationContainer = () => {
  const restApplicationContainer = new Container();

  restApplicationContainer
    .bind<RestApplication>(Component.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
  restApplicationContainer
    .bind<ILogger>(Component.Logger)
    .to(Logger)
    .inSingletonScope();
  restApplicationContainer
    .bind<IConfig<IRestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  restApplicationContainer
    .bind<IDatabaseClient>(Component.DatabaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();

  return restApplicationContainer;
};
