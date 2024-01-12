import { infoLog } from "../../shared/libs/colorize/index.js";

import { ECommand, ICommand } from "./interfaces.js";

export class HelpCommand implements ICommand {
  public getName(): string {
    return ECommand.Help;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(
      infoLog(`
    Программа для подготовки данных для REST API сервера.
    Пример:
        main.cli.js --<command> [--arguments]
    Команды:
        --version:            # выводит номер версии
        --help:               # печатает этот текст
        --import <path>:      # импортирует данные из TSV
      `)
    );
  }
}
