interface UIAction{
    initialize(isHeadless: any):Promise<void>;
    closeBrowser(): Promise<void>;
    openURL(url:string): Promise<void>;
    refresh():Promise<void>;
    clickElement(locator:any):Promise<void|any>;
    enterTextOnElement(locator:any,value:any):Promise<void|any>;
    waitForElementToBeClickable(locator:any):Promise<void|any>;
    waitUntillElementDisappear(locator:any,timeInSeconds:number):Promise<any>;
    waitUntillElementAppear(locator:any,timeInSeconds?:number):Promise<any>;
    waitForElement(locator:any,timeInSeconds?:number):Promise<void>;
    isElementDisplayed(locator:any):Promise<boolean|any>;
    isElementEnabled(locator:any):Promise<boolean|any>;
    isElementSelected(locator:any):Promise<boolean|any>;
    getAttributeValue(locator:any,attributeName:any):Promise<any>;
    getURL():Promise<string|any>;
    evaluateExpression(expression:any):Promise<void|any>;
    takeScreenshot(options:any,screnshotType:any,elementLocator?:any):Promise<void|any>;
    jsClick(locator:any):Promise<void|any>;
    scrollIntoView(locator:any):Promise<void>;
    isElementPresent(locator: any):Promise<any>;
    switchToNewTab(locator:string):Promise<void>;
    selectDropdown(locator:string,option:string):Promise<void>;
    changePageReferenceToOpenTab(tabIndex:string):Promise<void>;
    closePage():Promise<void>;
    controlClickElement(locator:any):Promise<void>;
    hoverElement(locator:any):Promise<void>;
    getWebElements(locator:any):Promise<any>;
    dbClickElement(locator:any):Promise<void|any>;
    isElementPresentInDOM(locator: any):Promise<any>;
    typeUsingKeyBoard(text:any):Promise<void>;
    downloadFile(locator:any,locationToSave:any):Promise<void>;
    getElementsCount(locator: any):Promise<any>;
    getTextFromReadOnlyInput(locator: any):Promise<any>;
}
export {UIAction}