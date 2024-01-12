import { TParsedCommand } from "./interfaces.js";

export class CommandParser {
  static parse(cliArguments: string[]): TParsedCommand {
    const parsedCommand: TParsedCommand = {};
    let currentCommand = "";

    for (const argument of cliArguments) {
      if (argument.startsWith("--")) {
        parsedCommand[argument] = [];
        currentCommand = argument;
      }

      if (currentCommand && argument) {
        parsedCommand[currentCommand].push(argument);
      }
    }

    return parsedCommand;
  }
}
