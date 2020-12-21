import { Browser } from 'puppeteer';
import { Test, TestingModule } from '@nestjs/testing';
import {
  PuppeteerHandlerService,
  getSafeNumber,
} from './puppeteer-handler.service';

describe('PuppeteerHandlerService', () => {
  let service: PuppeteerHandlerService;
  let browsers: Browser[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuppeteerHandlerService],
    }).compile();

    jest.setTimeout(15000);
    service = module.get<PuppeteerHandlerService>(PuppeteerHandlerService);
  });

  afterEach(async () => {
    jest.setTimeout(15000);
    await Promise.all(browsers.map((b) => b.close()));
    browsers = [];
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
    const now = new Date();
    await service.delay();
    expect(new Date().getTime() - now.getTime()).toBeGreaterThanOrEqual(1000);
  });

  it('check creating browser instance', async () => {
    const browser = await service.getBrowserInstance();
    if (browser) {
      browsers.push(browser);
    }
    expect(browser).toBeTruthy();
    await browser.close();
  });

  it('check creating page', async () => {
    const browser = await service.getBrowserInstance();
    if (browser) {
      browsers.push(browser);
    }
    const page = await service.getPage(browser);
    expect(page).toBeTruthy();
  });
});
