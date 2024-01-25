import got from "got";
import chalk from "chalk";

import { IMockServerData } from "../../shared/interfaces/index.js";
import { getErrorMessage, handlePromise } from "../../shared/utils/index.js";

import { TSVOfferGenerator } from "../../shared/libs/tsv-offer-generator/index.js";
import { TSVFileWriter } from "../../shared/libs/tsv-file-writer/index.js";

import { ECommand, ICommand } from "./interfaces.js";

export class GenerateCommand implements ICommand {
  private initialData: IMockServerData;

  public getName(): string {
    return ECommand.Generate;
  }

  private async load(url: string): Promise<void> {
    const [errorLoad, data] = await handlePromise<IMockServerData>(
      got.get(url).json()
    );

    if (errorLoad) {
      throw new Error(`Не удалось загрузить данные из: ${url}`);
    }

    this.initialData = data;
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [, count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    const [errorLoad] = await handlePromise(this.load(url));
    if (errorLoad) {
      console.error(chalk.bold.red(getErrorMessage(errorLoad)));
      return;
    }

    const [errorWrite] = await handlePromise(this.write(filepath, offerCount));
    if (errorWrite) {
      console.error(chalk.bold.red("Не удалось сгенерировать данные"));
      console.error(getErrorMessage(errorWrite));
      return;
    }

    console.info(chalk.greenBright(`Файл ${filepath} с мокк-данными создан!`));
  }
}
