import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { ECommand, ICommand } from "./interfaces.js";
import { isPackageJSONConfig } from "./guards.js";
import chalk from "chalk";

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

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(chalk.greenBright(`Версия проекта ${version}`));
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(
        chalk.bold.red(`Ошибка чтения версии из: ${this.filePath}`)
      );
      console.error(chalk.bold.red(`Детали: ${error.message}`));
    }
  }
}
