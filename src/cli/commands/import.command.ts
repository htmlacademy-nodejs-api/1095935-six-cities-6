import chalk from "chalk";

import { TSVFileReader } from "../../shared/libs/tsv-file-reader/tsv-file-reader.js";

import { ECommand, ICommand } from "./interfaces.js";

export class ImportCommand implements ICommand {
  public getName(): string {
    return ECommand.Import;
  }

  public execute(...parameters: string[]): void {
    const [, filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(chalk.bold.red(`Ошибка импорта данных из: ${filename}`));
      console.error(chalk.bold.red(`Детали: ${error.message}`));
    }
  }
}
