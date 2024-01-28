import convict from "convict";
import validator from "convict-format-with-validator";

convict.addFormats(validator);

export interface IRestSchema {
  PORT: number;
  SALT: string;
  DB_HOST: string;
}

export const configRestSchema = convict<IRestSchema>({
  PORT: {
    doc: "Порт для входящих подключений",
    format: "port",
    env: "PORT",
    default: 4000,
  },
  SALT: {
    doc: "Соль для хеширования пароля",
    format: String,
    env: "SALT",
    default: null,
  },
  DB_HOST: {
    doc: "IP-адрес базы данных (MongoDB)",
    format: "ipaddress",
    env: "DB_HOST",
    default: "127.0.0.1",
  },
});
