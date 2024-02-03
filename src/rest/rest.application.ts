import { inject, injectable } from "inversify";

import { ConsoleLogger } from "../shared/libs/logger/index.js";
import { IConfig, IRestSchema } from "../shared/libs/config/index.js";
import { IDatabaseClient } from "../shared/libs/database-client/index.js";
import { Component } from "../shared/interfaces/index.js";
import { getMongoURI } from "../shared/utils/index.js";

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ConsoleLogger,
    @inject(Component.Config) private readonly config: IConfig<IRestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: IDatabaseClient
  ) {}

  private async _initDb() {
    const mongoUri = getMongoURI({
      username: this.config.get("DB_USER"),
      password: this.config.get("DB_PASSWORD"),
      host: this.config.get("DB_HOST"),
      port: this.config.get("DB_PORT"),
      dbName: this.config.get("DB_NAME"),
    });

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info("Инициализация приложения ...");
    this.logger.info(`Получаем занчения env $PORT: ${this.config.get("PORT")}`);

    this.logger.info("Инициализация БД ...");
    await this._initDb();
    this.logger.info("Инициализация БД завершена");
  }
}
