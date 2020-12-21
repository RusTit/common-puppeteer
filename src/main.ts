import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PuppeteerHandlerService } from './puppeteer-handler/puppeteer-handler.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const url = process.env.URL_TO_OPEN;
  if (!url) {
    Logger.error(`Invalid usage. Environment variable URL_TO_OPEN is not set.`);
    return;
  }
  const app = await NestFactory.create(AppModule);
  const service = app.get(PuppeteerHandlerService);
  await service.run(url);
  await app.close();
}
bootstrap();
