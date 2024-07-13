import { FactoryRegistries } from "../factory/factoryRegistry";
import { FileHandler } from "../utilities/fileHandler";
import { LocatorsConstant } from "../utilities/locatorsConstant";
import * as config from "../config/config.json";

export class TestExecutor {
  private commonPage = FactoryRegistries.getCommonPage();

  async executeAction(testStep) {
    switch (testStep.action) {
      case "Click":
        await global.actionDriver.clickElement(testStep.locator);
        break;
      case "EnterValue":
        await global.actionDriver.enterTextOnElement(
          testStep.locator,
          testStep.value
        );
        break;
      case "WaitUntillElementDisappear":
        await global.actionDriver.waitUntillElementDisappear(
          testStep.locator,
          110
        );
        break;
      case "WaitUntillElementAppear":
        await global.actionDriver.waitUntillElementAppear(
          testStep.locator,
          110
        );
        break;
      case "VerifyPageTitle":
        const pageTitle = await global.actionDriver.getPageTitle();
        global.expect_(pageTitle).to.be.equal(testStep.value);
        break;
      case "VerifyElementText":
        const textValue = await global.actionDriver.getElementText(
          testStep.locator
        );
        global.expect_(textValue).to.be.equal(testStep.value);
        break;
      case "VerifyVisibility":
        if(testStep.value === "true"){
          await global.actionDriver.waitUntillElementAppear(testStep.locator,110);
        }
        const isVisible = await global.actionDriver.isElementDisplayed(
          testStep.locator
        );
        global.expect_(isVisible).to.be.equal(testStep.value === "true");
        break;
      case "WaitForPageLoadState":
        await global.actionDriver.waitForPageLoadState(testStep.value);
        break;
      case "WaitForElement":
        await global.actionDriver.waitForElement(Number(testStep.value));
        break;
      case "ScrollToView":
        await global.actionDriver.scrollIntoView(testStep.locator);
        break;
      case "SelectDropdown":
        await global.actionDriver.selectDropdown(
          testStep.locator,
          testStep.value
        );
        break;
      case "SwitchToNewTab":
        await global.actionDriver.switchToNewTab(testStep.locator);
        break;
      case "VerifyEnabled":
        const isEnabled = await global.actionDriver.isElementEnabled(
          testStep.locator
        );
        global.expect_(isEnabled).to.be.equal(testStep.value === "true");
        break;
      case "VerifyElementAttributeValue":
        await global.actionDriver.waitUntillElementAppear(testStep.locator,110);
        const attribute = testStep.value.split("~");
        const attributeValue = await global.actionDriver.getAttributeValue(
          testStep.locator,
          attribute[0]
        );
        global.expect_(attributeValue).to.be.equal(attribute[1]);
        break;
      case "VerifySelected":
        const isSelected = await global.actionDriver.isElementSelected(
          testStep.locator
        );
        global.expect_(isSelected).to.be.equal(testStep.value === "true");
        break;
      case "ChangePageReferenceToOpenTab":
        await global.actionDriver.changePageReferenceToOpenTab(testStep.value);
        break;
      case "ControlClick":
        await global.actionDriver.controlClickElement(testStep.locator);
        break;
      case "HoverElement":
        await global.actionDriver.hoverElement(testStep.locator);
        break;
      case "DoubleClick":
        await global.actionDriver.dbClickElement(testStep.locator);
        break;
      case "EvaluateExpression":
        await global.actionDriver.evaluateExpression(testStep.value);
        break;
      case "ClickIfElementPresent":
        if (await global.actionDriver.isElementDisplayed(testStep.locator)) {
          await global.actionDriver.clickElement(testStep.locator);
        }
        break;
      case "VerifyElementPresentInDOM":
        const isPresentInDOM = await global.actionDriver.isElementPresentInDOM(
          testStep.locator
        );
        global.expect_(isPresentInDOM).to.be.equal(testStep.value === "true");
        break;
      case "TypeUsingKeyBoard":
        await global.actionDriver.typeUsingKeyBoard(testStep.value);
        break;
      case "DownloadFile":
        await global.actionDriver.downloadFile(
          testStep.locator,
          config.DOWNLOADED_FILE_PATH
        );
        break;
      case "VerifyReadyOnlyInputText":
        const actualValue = await global.actionDriver.getTextFromReadOnlyInput(
          testStep.locator
        );
        global.expect_(actualValue).to.be.equal(testStep.value);
        break;
      default:
        console.log(
          `${testStep.action} is not defined.Please define your action in the TestExecutor Class.`
        );
    }
  }
  async getLocator(locatorIdentifier: string, parameters?: string) {
    let locatorGenerator = LocatorsConstant[locatorIdentifier];
    let locatorVariable = locatorGenerator.split(".");
    if (parameters) {
      let locatorParams = parameters.split(",");
      switch (locatorParams.length) {
        case 1:
          const case1key0 =
            (await FileHandler.getKeyValue(locatorParams[0])) ||
            locatorParams[0];
          return this[locatorVariable[0]][locatorVariable[1]][
            locatorVariable[2]
          ](await this.handleSeperatorInParams(case1key0));
        case 2:
          const case2key0 =
            (await FileHandler.getKeyValue(locatorParams[0])) ||
            locatorParams[0];
          const case2key1 =
            (await FileHandler.getKeyValue(locatorParams[1])) ||
            locatorParams[1];
          return this[locatorVariable[0]][locatorVariable[1]][
            locatorVariable[2]
          ](
            await this.handleSeperatorInParams(case2key0),
            await this.handleSeperatorInParams(case2key1)
          );
        case 3:
          const case3key0 =
            (await FileHandler.getKeyValue(locatorParams[0])) ||
            locatorParams[0];
          const case3key1 =
            (await FileHandler.getKeyValue(locatorParams[1])) ||
            locatorParams[1];
          const case3key2 =
            (await FileHandler.getKeyValue(locatorParams[2])) ||
            locatorParams[2];
          return this[locatorVariable[0]][locatorVariable[1]][
            locatorVariable[2]
          ](
            await this.handleSeperatorInParams(case3key0),
            await this.handleSeperatorInParams(case3key1),
            await this.handleSeperatorInParams(case3key2)
          );
        case 4:
          const case4key0 =
            (await FileHandler.getKeyValue(locatorParams[0])) ||
            locatorParams[0];
          const case4key1 =
            (await FileHandler.getKeyValue(locatorParams[1])) ||
            locatorParams[1];
          const case4key2 =
            (await FileHandler.getKeyValue(locatorParams[2])) ||
            locatorParams[2];
          const case4key3 =
            (await FileHandler.getKeyValue(locatorParams[3])) ||
            locatorParams[3];
          return this[locatorVariable[0]][locatorVariable[1]][
            locatorVariable[2]
          ](
            await this.handleSeperatorInParams(case4key0),
            await this.handleSeperatorInParams(case4key1),
            await this.handleSeperatorInParams(case4key2),
            await this.handleSeperatorInParams(case4key3)
          );
        case 5:
          const case5key0 =
            (await FileHandler.getKeyValue(locatorParams[0])) ||
            locatorParams[0];
          const case5key1 =
            (await FileHandler.getKeyValue(locatorParams[1])) ||
            locatorParams[1];
          const case5key2 =
            (await FileHandler.getKeyValue(locatorParams[2])) ||
            locatorParams[2];
          const case5key3 =
            (await FileHandler.getKeyValue(locatorParams[3])) ||
            locatorParams[3];
          const case5key4 =
            (await FileHandler.getKeyValue(locatorParams[4])) ||
            locatorParams[4];
          return this[locatorVariable[0]][locatorVariable[1]][
            locatorVariable[2]
          ](
            await this.handleSeperatorInParams(case5key0),
            await this.handleSeperatorInParams(case5key1),
            await this.handleSeperatorInParams(case5key2),
            await this.handleSeperatorInParams(case5key3),
            await this.handleSeperatorInParams(case5key4)
          );
        default:
          console.log(
            `Handler for ${locatorParams.length} parameters is not available.Please add it.`
          );
      }
    } else {
    }
  }

  private async handleSeperatorInParams(parameter: string) {
    return parameter.replaceAll("%2C", ",");
  }
}
