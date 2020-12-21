import { Module } from '@nestjs/common';
import { PuppeteerHandlerModule } from './puppeteer-handler/puppeteer-handler.module';

@Module({
  imports: [PuppeteerHandlerModule],
  providers: [],
})
export class AppModule {}
