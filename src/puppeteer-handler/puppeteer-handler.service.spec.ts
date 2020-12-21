import { Test, TestingModule } from '@nestjs/testing';
import { PuppeteerHandlerService } from './puppeteer-handler.service';

describe('PuppeteerHandlerService', () => {
  let service: PuppeteerHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuppeteerHandlerService],
    }).compile();

    service = module.get<PuppeteerHandlerService>(PuppeteerHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
