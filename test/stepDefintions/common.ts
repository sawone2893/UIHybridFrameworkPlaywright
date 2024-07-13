import { Given,When, Then } from "@cucumber/cucumber";
import {FactoryRegistries} from '../../src/factory/factoryRegistry'
import {env} from "../../src/utilities/parseEnv";
import * as config from "../../src/config/config.json";
import dotenv from "dotenv";
import { FileHandler } from "../../src/utilities/fileHandler";
import { randomNum } from "../../src/utilities/commonUtil";
dotenv.config({path:`${config.ENV_PATH}`});//This is for Testing environment configuration

const testExecutor=FactoryRegistries.getTestExecutor();
const commonPage = FactoryRegistries.getCommonPage();


/*Example:
 * When I "EnterValue" "Shabbir" for "TextField" with values "Username"
   When I "SelectDropdown" "CAT_LAB_ADMIN" for "TextField" with values "Username"
   When I "VerifyElementAttributeValue" "value~OIL,COOLANT" for "TextField" with values "Sample type"
 */
When('I {string} {string} for {string} with values {string}',async (action:string,textToBeEnter:string,locatorIdentifier:string,param:string)=>{
    const textToBeEnterTemp = await FileHandler.getKeyValue(textToBeEnter) || textToBeEnter;
    await testExecutor.executeAction({action:action,value:textToBeEnterTemp,locator:await testExecutor.getLocator(locatorIdentifier,param)});
});

/*Example:
 * Then I "Click" on "Button" with values "Login"
   Then I "WaitUntillElementDisappear" on "Button" with values "Login"
   Then I "WaitUntillElementAppear" on "Button" with values "Login"
   Then I "ScrollToView" on "ButtonWithText" with values "Continue"
   When I "SwitchToNewTab" on "TagWithAttribute" with values "img,title,Manage Tables"
   And I "DownloadFile" on "TagWithAttribute" with values "cr-icon-button,aria-label,Download"
 */
When('I {string} on {string} with values {string}',async (action:string,locatorIdentifier:string,param:string)=>{
    await testExecutor.executeAction({action:action,locator:await testExecutor.getLocator(locatorIdentifier,param)});
});

/*Example:
 * Then I "VerifyElementText" "Shabbir" is displayed in "LocaotrName" with values "ParamOfLocatorIfany"
 */
Then('I {string} {string} is displayed in {string} with values {string}',async (action:string,value:string,locatorIdentifier:string,param:string)=>{
    await testExecutor.executeAction({action:action,locator:await testExecutor.getLocator(locatorIdentifier,param),value:value});
});

/*Example:
 * Then I "VerifyVisibility" is "true" for "LocaotrName" with values "ParamOfLocatorIfany"
 */
Then('I {string} is {string} for {string} with values {string}',async (action:string,value:string,locatorIdentifier:string,param:string)=>{
    await testExecutor.executeAction({action:action,locator:await testExecutor.getLocator(locatorIdentifier,param),value:value});
});

/*Example:
 * Then I "VerifyPageTitle" ""
 * Then I "WaitForPageLoadState" "load"
 */
Then('I {string} {string}',async(action:string,value:string)=>{
    await testExecutor.executeAction({action:action,value:value});
});

/*Example:
* Then I "WaitForElement" "5" seconds
 */
Then('I {string} {string} seconds',async(action:string,value:string)=>{
    await testExecutor.executeAction({action:action,value:value});
});

/*Example:
* When I launch web lims application
 */
When('I launch web lims application',async()=>{
    await global.actionDriver.openURL(env("APP_URL"));
});

/*Example:
* When I create new session for user role "CAT_LAB_ADMIN"
 */
When('I create new session for user role {string}',async(userRole:string)=>{
    await commonPage.createdNewSession(userRole);
});

/*Example:
* When I "checked" checkbox "span,Search Text Id"
 */
When('I {string} checkbox {string}',async(status:string,checkboxName:string)=>{
    await commonPage.selectCheckBox(status,checkboxName);
});

/*Example:
* When I close current page
 */
When('I close current page',async()=>{
    await global.actionDriver.closePage();
});

/*Example:
* When I select user role as "CAT_LAB_ADMIN"
 */
When('I select user role as {string}',async(userRole:string)=>{
    await commonPage.selectUserRole(userRole);
});


/*Example:
* When I change screen control to "Frame" for "TextField" with values "Username"
* When I change screen control to "Page" for "TextField" with values "Username"
 */
When('I change screen control to {string} for {string} with values {string}',async(screenControl:string,locatorIdentifier: string, param: string )=>{
    await commonPage.changeScreenControl(screenControl, await testExecutor.getLocator(locatorIdentifier,param));
});


/*Example:
* When I store new random name for given "<folderName>"
 */
When('I store new random name for given {string}',async( name: string )=>{
    const newName = `${name}_${randomNum()}`; 
    await FileHandler.setKeyValue(name, newName);
});

/*Example:
* When I select "div,Sample Priority" "combobox-dropdown" with value "URGENT"
* When I select "div,Sample Type" "combobox-dropdown" with value "OIL"
 */
When('I select {string} {string} with value {string}',async(dropdownTagNameFieldName:string,dropdownClassName:string,ecValue:string)=>{
    const tagNameFieldName=dropdownTagNameFieldName.split(",");
    await commonPage.comboboxDropdown(tagNameFieldName[0],tagNameFieldName[1],dropdownClassName,ecValue);
});