import { config } from "dotenv";

import { ILogger } from "../logger/index.js";

import { IConfig } from "./config.interface.js";
import { IRestSchema, configRestSchema } from "./rest.schema.js";

export class RestConfig implements IConfig<IRestSchema> {
  private readonly config: IRestSchema;

  constructor(private readonly logger: ILogger) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error(
        "Не удалось прочитать .env-файл. Возможно он не существует."
      );
    }

    configRestSchema.load({});
    configRestSchema.validate({
      allowed: "strict",
      output: this.logger.info,
    });

    this.config = configRestSchema.getProperties();
    this.logger.info(".env-файл найден и успешно разобран");
  }

  public get<T extends keyof IRestSchema>(key: T): IRestSchema[T] {
    return this.config[key];
  }
}
