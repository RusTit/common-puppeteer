# Common puppeteer

## Requirements

1. Node.js 14+
2. Installed Yarn (`npm i -g yarn`)

## Installation

```shell
$ yarn install
```

## Configuration

App can be configured using environment variables or using `.env` file

```dotenv
# Required. Url to open in browser
URL_TO_OPEN=https://www.google.com
# Optional. Delay to wait after opening the page (ms)
URL_WAIT_DELAY=10000
# Optional. Default true. Set to false while in dev
HEADLESS=true
# Optional. Default page width = 1920
PAGE_WIDTH=1920
# Optional. Default page height = 1040
PAGE_HEIGHT=1040
```

## Usage
