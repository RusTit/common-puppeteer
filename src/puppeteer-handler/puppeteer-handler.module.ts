import { Module } from '@nestjs/common';
import { PuppeteerHandlerService } from './puppeteer-handler.service';

@Module({
  providers: [PuppeteerHandlerService],
})
export class PuppeteerHandlerModule {}
