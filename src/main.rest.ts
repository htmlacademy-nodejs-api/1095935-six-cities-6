import { Logger } from "./shared/libs/logger/index.js";
import { RestApplication } from "./rest/index.js";

async function bootstrap() {
  const logger = new Logger();

  const application = new RestApplication(logger);
  await application.init();
}

bootstrap();
