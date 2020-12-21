import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PuppeteerHandlerModule } from './puppeteer-handler/puppeteer-handler.module';

@Module({
  imports: [
    PuppeteerHandlerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
