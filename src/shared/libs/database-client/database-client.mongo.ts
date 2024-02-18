import { setTimeout } from "node:timers/promises";
import * as Mongoose from "mongoose";
import { inject, injectable } from "inversify";

import { Component } from "../../interfaces/index.js";

import { ILogger } from "../logger/index.js";

import { IDatabaseClient } from "./database-client.interface.js";

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error("БД уже подключена");
    }

    this.logger.info("Пытаемся подключиться к БД ...");

    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info("Подключение к БД установлено");
        return;
      } catch (error) {
        attempt++;
        this.logger.error(
          `Не удалось подключиться к БД. Попытка ${attempt} ...`,
          error as Error
        );
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error(
      `Не удалось установить соединение с БД, после ${RETRY_COUNT} попыток`
    );
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error("Нет соединения с БД");
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info("Соединение с БД закрыто");
  }
}
