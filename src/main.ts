import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PuppeteerHandlerService } from './puppeteer-handler/puppeteer-handler.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const service = app.get(PuppeteerHandlerService);
  await service.run();
  await app.close();
}
bootstrap();
