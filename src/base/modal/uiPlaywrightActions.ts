
import { Browser, BrowserContext, FrameLocator, LaunchOptions, Page, chromium, firefox, webkit } from 'playwright';
import { UIAction } from '../interface/uiAction';
import * as fs from 'fs/promises'

type PresentScreenType = "Page" | "Frame" | "Shadow Dom";

export class UIPlaywrightActions implements UIAction {
  private browserType: string;
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private iframe: FrameLocator = null;
  private maxWaitTime: number = 120;
  private presentScreen: PresentScreenType = "Page";

  async setPresentScreen(screen: PresentScreenType) {
    this.presentScreen = screen;
  }

  constructor(browserType: string) {
    this.browserType = browserType;
  }

  async initialize(isHeadless: any) {
    this.browser = await this.launchBrowser(isHeadless);
    this.context = await this.browser.newContext({
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
    });
    this.context.clearCookies();
    this.page = await this.context.newPage();
  }

  async launchBrowser(isHeadless: any): Promise<Browser> {
    const launchOptions: LaunchOptions = {
      headless: isHeadless,
      slowMo: 1000,
    };
    switch (this.browserType.toLowerCase()) {
      case "chromium":
        return await chromium.launch(launchOptions);
      case "firefox":
        return await firefox.launch(launchOptions);
      case "webkit":
        return await webkit.launch(launchOptions);
      default:
        throw new Error(`Unsupported browser Type: ${this.browserType}`);
    }
  }

  async closeBrowser(): Promise<void> {
    await this.browser.close();
  }

  async openURL(url: string) {
    await this.page.goto(url, { waitUntil: "load", timeout: 120000 });
  }

  async refresh(): Promise<void> {
    await this.page.reload();
  }

  async clickElement(locator: string): Promise<void> {
    if (this.waitUntillElementAppear(locator, this.maxWaitTime)) {
      await this.waitForElementToBeClickable(locator);
      const element = await this.getWebElement(locator);
      await element.click({ button: "left" });
      console.log(`Clicked element: ${locator}`);
      this.waitUntillElementDisappear("//div[@id='ec_default_ajax_status:busy']",100);
    } else {
      throw new Error(
        `Unable to click Element with locator:${locator} is not present in the DOM or displayed`
      );
    }
  }

  async enterTextOnElement(locator: any, value: any): Promise<any> {
    if (this.waitUntillElementAppear(locator, this.maxWaitTime)) {
      const element = await this.getWebElement(locator);
      await element.fill(value);
      console.log(`Enter text on element: ${locator}`);
    } else {
      throw new Error(
        `Unable to enter text to Element with locator:${locator} is not present in the DOM or displayed`
      );
    }
  }

  async waitForElementToBeClickable(locator: any): Promise<any> {
    try {
      const element = await this.getWebElement(locator);
      await element.isEnabled({ timeout: 30000 });
    } catch (error) {
      console.error("Element is not clickable within the specified timeout.");
    }
  }

  async waitUntillElementDisappear(
    locator: any,
    timeInSeconds: number
  ): Promise<any> {
    let status = true;
    try {
      const startTime = Date.now();
      while (await this.isElementDisplayed(locator)) {
        console.log(`Waiting for Element[${locator}] to be disappear...`);
        await this.waitForPageLoadState("networkidle");
        await this.waitForPageLoadState("load");
        await this.waitForPageLoadState("domcontentloaded");
        await this.waitForElement(1);
        const endTime = Date.now();
        if (endTime - startTime > timeInSeconds * 1000) {
          break;
        }
      }
    } catch (error) {
      status = false;
      console.error(
        `Element:: ${locator} is not disappear within the specified timeout.`
      );
    }
    return status;
  }

  async waitUntillElementAppear(
    locator: any,
    timeInSeconds: number
  ): Promise<any> {
    let status = true;
    try {
      const startTime = Date.now();
      while (!(await this.isElementDisplayed(locator))) {
        console.log(`Waiting for Element[${locator}] to be appear...`);
        await this.waitForPageLoadState("networkidle");
        await this.waitForPageLoadState("load");
        await this.waitForPageLoadState("domcontentloaded");
        await this.waitForElement(1);
        const endTime = Date.now();
        if (endTime - startTime > timeInSeconds * 1000) {
          break;
        }
      }
    } catch (error) {
      status = false;
      console.error(
        `Element:: ${locator} is not appear within the specified timeout.`
      );
    }

    return status;
  }

  async waitForElement(timeInSeconds: number): Promise<void> {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }

  async isElementDisplayed(locator: any): Promise<boolean> {
    const element = await this.getWebElement(locator);
    try {
      if (await element.isVisible()) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  async isElementEnabled(locator: any): Promise<any> {
    const element = await this.getWebElement(locator);
    return await element.isEnabled();
  }

  async isElementSelected(locator: any): Promise<any> {
    const element = await this.getWebElement(locator);
    return await element.isChecked();
  }

  async getAttributeValue(locator: any, attributeName: any): Promise<any> {
    const element = await this.getWebElement(locator);
    return (await element.getAttribute(attributeName)).trim();
  }

  async getURL(): Promise<any> {
    return this.page.url();
  }

  async evaluateExpression(expression: any): Promise<any> {
    return await this.page.evaluate(expression);
  }

  async takeScreenshot(
    options: any,
    screnshotType = "FullPage",
    elementLocator?: any
  ): Promise<any> {
    let buffer = null;
    if (screnshotType == "FullPage") {
      buffer = await this.page.screenshot(options);
    } else {
      const element = await this.getWebElement(elementLocator);
      buffer = await element.screenshot(options);
    }
    return buffer;
  }

  async jsClick(locator: any): Promise<any> {
    const functionString = `
       const xpathSeletor='${locator}';
       const element=document.evalaute(xpathSeletor,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,Null).singleNodeValue;
       if(element instance of HTMLElement){
            element.click();
       }`;
    await this.evaluateExpression(functionString);
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getElementText(locator: any) {
    const element = await this.getWebElement(locator);
    return (await element.textContent()).trim();
  }

  async waitForPageLoadState(eventName: string): Promise<void> {
    switch (eventName.toLowerCase()) {
      case "networkidle":
        await this.page.waitForLoadState("networkidle");
        break;
      case "load":
        await this.page.waitForLoadState("load");
        break;
      case "domcontentloaded":
        await this.page.waitForLoadState("domcontentloaded");
        break;
      default:
        throw new Error(`Invalid Event Name: ${eventName}`);
    }
  }

  async scrollIntoView(locator: any) {
    if (await this.isElementPresent(locator)) {
      const element = await this.getWebElement(locator);
      element.scrollIntoViewIfNeeded();
    } else {
      throw new Error(
        `Unable to perfomr scroll as Web element:[${locator}] is not present`
      );
    }
  }

  async isElementPresent(locator: any) {
    let status = false;
    if (this.presentScreen == "Page") {
      if ((await this.page.$$(locator)).length > 0) {
        if (this.isElementDisplayed(locator)) {
          status = true;
        } else {
          status = false;
        }
      } else {
        status = false;
      }
    } else {
      const iframeInstance = await this.getIFrame(global.frameLocator);
      if ((await iframeInstance.locator(locator).all()).length > 0) {
        if (this.isElementDisplayed(locator)) {
          status = true;
        } else {
          status = false;
        }
      } else {
        status = false;
      }
    }
    return status;
  }

  async switchToNewTab(locator: string): Promise<void> {
    const newPagePromise = this.context.waitForEvent("page", {
      timeout: this.maxWaitTime * 1000,
    });
    await this.clickElement(locator);
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    await newPage.waitForTimeout(5000);
    this.page = newPage;
  }

  async getIFrame(locator: string) {
    return (this.iframe = this.page.frameLocator(locator));
  }

  async selectDropdown(locator: string, option: string): Promise<void> {
    const element = await this.getWebElement(locator);
    await element.selectOption(option);
  }

  async changePageReferenceToOpenTab(tabIndex: string) {
    const allPages = this.context.pages();
    this.page = allPages[Number(tabIndex)];
  }

  async closePage(): Promise<void> {
    await this.page.close();
  }

  async controlClickElement(locator: string) {
    if (this.waitUntillElementAppear(locator, this.maxWaitTime)) {
      await this.waitForElementToBeClickable(locator);
      const element = await this.getWebElement(locator);
      await element.click({ modifiers: ["Control"] });
      console.log(`Control clicked perform on element: ${locator}`);
    } else {
      throw new Error(
        `Unable to perfrom control click on Element with locator:${locator} is not present in the DOM or displayed`
      );
    }
  }

  async hoverElement(locator: string) {
    if (this.waitUntillElementAppear(locator, this.maxWaitTime)) {
      const element = await this.getWebElement(locator);
      await element.hover();
      console.log(`Hover perform on element: ${locator}`);
    } else {
      throw new Error(
        `Unable to perfrom hover on Element with locator:${locator} is not present in the DOM or displayed`
      );
    }
  }

  async getWebElements(locator: any) {
    if (this.presentScreen == "Page") {
      return await this.page.locator(locator).all();
    } else {
      const iframeInstance = await this.getIFrame(global.frameLocator);
      return iframeInstance.locator(locator).all();
    }
  }

  async dbClickElement(locator: string): Promise<void> {
    if (this.waitUntillElementAppear(locator, this.maxWaitTime)) {
      await this.waitForElementToBeClickable(locator);
      const element = await this.getWebElement(locator);
      await element.dblclick({ button: "left" });
      console.log(`Clicked element: ${locator}`);
    } else {
      throw new Error(
        `Unable to click Element with locator:${locator} is not present in the DOM or displayed`
      );
    }
  }

  async getWebElement(locator: any) {
    if (this.presentScreen == "Page") {
      return this.page.locator(locator);
    }else {
      const iframeInstance = await this.getIFrame(global.frameLocator);
      return iframeInstance.locator(locator);
    }
  }

  async isElementPresentInDOM(locator: any) {
    let status = false;
    if (this.presentScreen == "Page") {
      if ((await this.page.$$(locator)).length > 0) {
        return true;
      } else {
        status = false;
      }
    } else {
      const iframeInstance = await this.getIFrame(global.frameLocator);
      if ((await iframeInstance.locator(locator).all()).length > 0) {
        return true;
      } else {
        status = false;
      }
    }
    return status;
  }

  async typeUsingKeyBoard(text: string) {
    await this.page.keyboard.type(text);
  }

  async downloadFile(locator: any, locationToSave: any) {
    const downloadPromise = this.page.waitForEvent("download");
    await this.clickElement(locator);
    const download = await downloadPromise;
    await download.saveAs(`${locationToSave}/${download.suggestedFilename()}`);
  }

  async getElementsCount(locator: any){
    return(await this.getWebElements(locator)).length;
  }

  async getTextFromReadOnlyInput(locator: any){
    return this.page.inputValue(locator);

  }
}
