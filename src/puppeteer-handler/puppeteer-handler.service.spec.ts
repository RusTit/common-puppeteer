import { Test, TestingModule } from '@nestjs/testing';
import {
  PuppeteerHandlerService,
  getSafeNumber,
} from './puppeteer-handler.service';

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

  it('check getSafeNumber', () => {
    expect(getSafeNumber(undefined, 1)).toBe(1);
    expect(getSafeNumber('', 2)).toBe(2);
    expect(getSafeNumber('ad', 3)).toBe(3);
    expect(getSafeNumber(4, 5)).toBe(4);
    expect(getSafeNumber('4', 5)).toBe(4);
  });

  it('check delay', async () => {
    jest.setTimeout(15000);
    const now = new Date();
    await service.delay();
    expect(new Date().getTime() - now.getTime()).toBeGreaterThanOrEqual(1000);
  });
});
