export interface ICommand {
  getName(): string;
  execute(...parameters: string[]): void;
}

export interface IPackageJSONConfig {
  version: string;
}

export const enum ECommand {
  Help = "--help",
  Version = "--version",
  Import = "--import",
  Generate = "--generate"
}
