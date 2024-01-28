import { IConfig, IRestSchema } from "../shared/libs/config/index.js";
import { Logger } from "../shared/libs/logger/index.js";

export class RestApplication {
  constructor(
    private readonly logger: Logger,
    private readonly config: IConfig<IRestSchema>
  ) {}

  public async init() {
    this.logger.info("Инициализация приложения ...");
    this.logger.info(`Получаем занчения env $PORT: ${this.config.get("PORT")}`);
  }
}
