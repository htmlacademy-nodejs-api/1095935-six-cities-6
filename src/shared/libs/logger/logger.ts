import { resolve } from "node:path";
import { Logger as PinoLogger, pino, transport } from "pino";

import { ILogger } from "./logger.interface.js";

import { getCurrentModuleDirectoryPath } from "../../utils/index.js";

export class Logger implements ILogger {
  private readonly logger: PinoLogger;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = "logs/rest.log";
    const destination = resolve(modulePath, "../../../", logFilePath);

    const multiTransport = transport({
      targets: [
        {
          target: "pino/file",
          options: {
            destination,
            mkdir: true,
            append: false,
          },
          level: "debug",
        },
        {
          target: "pino/file",
          level: "info",
        },
      ],
    });

    this.logger = pino({}, multiTransport);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
