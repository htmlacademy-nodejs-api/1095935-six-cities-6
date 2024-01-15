import { ICommand } from "./commands/interfaces.js";

export type TParsedCommand = Record<string, string[]>;

export type TCommandCollection = Record<string, ICommand>;
