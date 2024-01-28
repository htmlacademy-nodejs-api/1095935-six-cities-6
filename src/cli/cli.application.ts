import { ECommand, ICommand } from "./commands/index.js";

import { CommandParser } from "./command-parser.js";
import { TCommandCollection } from "./interfaces.js";

export class CLIApplication {
  private commands: TCommandCollection = {};

  constructor(private readonly defaultCommand: string = ECommand.Help) {}

  public registerCommands(commandList: ICommand[]): void {
    commandList.forEach((command) => {
      const commandName = command.getName();

      if (Object.hasOwn(this.commands, commandName)) {
        throw new Error(`Команда ${commandName} уже зарегистрирована`);
      }

      this.commands[commandName] = command;
    });
  }

  public getCommand(commandName: string): ICommand {
    return this.commands[commandName] || this.getDefaultCommand();
  }

  public getDefaultCommand(): ICommand {
    return this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);

    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] || [];
    command.execute(...commandArguments);
  }
}
