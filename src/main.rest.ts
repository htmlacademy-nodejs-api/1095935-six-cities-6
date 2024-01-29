import "reflect-metadata";
import { Container } from "inversify";

import { Component } from "./shared/interfaces/index.js";
import { ILogger, Logger } from "./shared/libs/logger/index.js";
import {
  RestConfig,
  IConfig,
  IRestSchema,
} from "./shared/libs/config/index.js";

import { RestApplication } from "./rest/index.js";

const bootstrap = async () => {
  const container = new Container();
  container
    .bind<RestApplication>(Component.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
  container.bind<ILogger>(Component.Logger).to(Logger).inSingletonScope();
  container
    .bind<IConfig<IRestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
};

bootstrap();
