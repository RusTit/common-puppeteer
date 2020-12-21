import { Injectable, Logger } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, LaunchOptions, Page, NavigationOptions } from 'puppeteer';

export const NAVIGATION: NavigationOptions = {
  waitUntil: 'networkidle2',
  timeout: 60000,
};

export const NAVIGATION_EARLIEST: NavigationOptions = {
  timeout: 60000,
  waitUntil: 'domcontentloaded',
};

export function getSafeNumber(
  value: string | undefined,
  defaultValue: number,
): number {
  if (value) {
    const parsedValue = Number.parseInt(value.toString(), 10);
    if (Number.isFinite(parsedValue)) {
      return parsedValue;
    }
  }
  return defaultValue;
}

const DEFAULT_PAGE_WIDTH = 1920;
const DEFAULT_PAGE_HEIGHT = 1040;
const DEFAULT_URL_NAVIGATION_WAIT = 10000;

@Injectable()
export class PuppeteerHandlerService {
  async getBrowserInstance(): Promise<Browser> {
    Logger.log('Creating new browser instance');
    const args: string[] = ['--no-sandbox', '--disable-setuid-sandbox'];
    const options: LaunchOptions = {
      headless: process.env.HEADLESS ? process.env.HEADLESS === 'true' : true,
      ignoreHTTPSErrors: true,
      args,
    };
    const browser = await puppeteer.use(StealthPlugin()).launch(options);
    Logger.log('New browser instance was created');
    return browser;
  }

  async delay(mls = 1000): Promise<void> {
    Logger.debug(`Delay: ${mls}`);
    return new Promise<void>((resolve) => setTimeout(resolve, mls));
  }

  async getPage(browser: Browser): Promise<Page> {
    Logger.debug('Creating new page');
    const page = await browser.newPage();
    const width = getSafeNumber(process.env.PAGE_WIDTH, DEFAULT_PAGE_WIDTH);
    const height = getSafeNumber(process.env.PAGE_HEIGHT, DEFAULT_PAGE_HEIGHT);
    await page.setViewport({ width, height });
    page.on('console', (msg) =>
      Logger.debug(`PAGE LOG: ${msg.type()} ${msg.text()}`),
    );
    return page;
  }

  async run(): Promise<void> {
    let browser: Browser | undefined;
    try {
      const url = process.env.URL_TO_OPEN;
      if (!url) {
        throw new Error(
          `Invalid usage. Environment variable URL_TO_OPEN is not set.`,
        );
      }
      browser = await this.getBrowserInstance();
      const page = await this.getPage(browser);
      Logger.debug('Navigation started (opening the url');
      await page.goto(url);
      Logger.debug('Navigation finished');
      const delayMs = getSafeNumber(
        process.env.URL_WAIT_DELAY,
        DEFAULT_URL_NAVIGATION_WAIT,
      );
      Logger.debug(`Waiting for ${delayMs} ms`);
      await this.delay(delayMs);
    } catch (e) {
      Logger.error(`Error: ${e.message}`);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
