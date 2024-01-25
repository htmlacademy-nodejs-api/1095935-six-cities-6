import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import chalk from "chalk";

import { getErrorMessage, handleTryCatch } from "../../shared/utils/index.js";

import { ECommand, ICommand } from "./interfaces.js";
import { isPackageJSONConfig } from "./guards.js";

export class VersionCommand implements ICommand {
  constructor(private readonly filePath: string = "./package.json") {}

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), "utf-8");
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error("Не удалось разобрать JSON");
    }

    return importedContent.version;
  }

  public getName(): string {
    return ECommand.Version;
  }

  public execute(..._parameters: string[]): void {
    const [errorRead, version] = handleTryCatch(this.readVersion());

    if (errorRead) {
      console.error(
        chalk.bold.red(`Ошибка чтения версии из: ${this.filePath}`)
      );
      console.error(chalk.bold.red(getErrorMessage(errorRead)));
      return;
    }

    console.info(chalk.greenBright(`Версия проекта ${version}`));
  }
}
