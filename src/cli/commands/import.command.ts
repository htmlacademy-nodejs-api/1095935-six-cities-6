import chalk from "chalk";

import {
  createOffer,
  getErrorMessage,
  handlePromise,
} from "../../shared/utils/index.js";
import { TSVFileReader } from "../../shared/libs/tsv-file-reader/index.js";

import { ECommand, ICommand } from "./interfaces.js";

export class ImportCommand implements ICommand {
  public getName(): string {
    return ECommand.Import;
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(chalk.greenBright(JSON.stringify(offer, null, 2)));
  }

  private onCompleteImport(count: number) {
    console.info(chalk.greenBright(`${count} строк импортировано.`));
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [, filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on("line", this.onImportedLine);
    fileReader.on("end", this.onCompleteImport);

    const [errorRead] = await handlePromise(fileReader.read());

    if (errorRead) {
      console.error(chalk.bold.red(`Ошибка импорта данных из: ${filename}`));
      console.error(chalk.bold.red(getErrorMessage(errorRead)));
    }
  }
}
