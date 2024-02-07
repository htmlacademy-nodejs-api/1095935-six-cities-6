import convict from "convict";
import validator from "convict-format-with-validator";

convict.addFormats(validator);

export interface IRestSchema {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
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
    doc: "IP-адрес MongoDB",
    format: "ipaddress",
    env: "DB_HOST",
    default: "127.0.0.1",
  },
  DB_PORT: {
    doc: "Порт для соединения с БД",
    format: "port",
    env: "DB_PORT",
    default: "27017",
  },
  DB_NAME: {
    doc: "Имя БД",
    format: String,
    env: "DB_NAME",
    default: "six-cities",
  },
  DB_USER: {
    doc: "Имя пользователя для подключения к БД",
    format: String,
    env: "DB_USER",
    default: null,
  },
  DB_PASSWORD: {
    doc: "Пароль пользователя для подключения к БД",
    format: String,
    env: "DB_PASSWORD",
    default: null,
  },
});
