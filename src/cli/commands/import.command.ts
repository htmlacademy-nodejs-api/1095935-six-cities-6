import chalk from "chalk";

import {
  createOffer,
  getErrorMessage,
  getMongoURI,
  handlePromise,
} from "../../shared/utils/index.js";
import { IOffer } from "../../shared/interfaces/index.js";

import { TSVFileReader } from "../../shared/libs/tsv-file-reader/index.js";
import { MongoDatabaseClient } from "../../shared/libs/database-client/index.js";
import { ConsoleLogger, ILogger } from "../../shared/libs/logger/index.js";

import { UserModel, UserService } from "../../shared/modules/user/index.js";
import { OfferModel, OfferService } from "../../shared/modules/offer/index.js";

import { ECommand, ICommand } from "./interfaces.js";

const DEFAULT_DB_PORT = "27017";
const DEFAULT_USER_PASSWORD = "123456";

export class ImportCommand implements ICommand {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: MongoDatabaseClient;
  private logger: ILogger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new UserService(this.logger, UserModel);
    this.offerService = new OfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return ECommand.Import;
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(chalk.greenBright(`${count} строк импортировано.`));
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: IOffer) {
    const { author, ...restOffer } = offer;

    const user = await this.userService.findOrCreate(
      {
        ...author,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt
    );

    await this.offerService.create({
      ...restOffer,
      authorId: user.id,
    });
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [, filename, login, password, dbName, host, salt] = parameters;
    this.salt = salt;

    const uri = getMongoURI({
      username: login,
      password,
      host,
      port: DEFAULT_DB_PORT,
      dbName,
    });

    await this.databaseClient.connect(uri);

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
