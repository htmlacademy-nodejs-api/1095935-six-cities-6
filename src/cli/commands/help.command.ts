import chalk from "chalk";

import { ECommand, ICommand } from "./interfaces.js";

export class HelpCommand implements ICommand {
  public getName(): string {
    return ECommand.Help;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
    Программа для подготовки данных для REST API сервера. 
    Пример:
        main.cli.js --<${chalk.bold.yellow("command")}> [${chalk.bold.yellow("--arguments")}]
    Команды:
        ${chalk.bold.yellow("--version")}:                   ${chalk.bold.blue("# выводит номер версии")}
        ${chalk.bold.yellow("--help")}:                      ${chalk.bold.blue("# печатает этот текст")}
        ${chalk.bold.yellow("--import")} <path>:             ${chalk.bold.blue("# импортирует данные из TSV")}
        ${chalk.bold.yellow("--generate")} <n> <path> <url>: ${chalk.bold.blue("# генерирует тестовые данные")}
    `);
  }
}
