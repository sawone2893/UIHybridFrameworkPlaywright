import { DriverFactory } from "./src/base/driverFactory/driverFactory";
import { BeforeAll, AfterAll, setDefaultTimeout, AfterStep, Status, Before, After } from "@cucumber/cucumber";
import { FactoryRegistries } from "./src/factory/factoryRegistry";
import * as config from "./src/config/config.json";
import dotenv from "dotenv";
import {env} from "./src/utilities/parseEnv";
dotenv.config({path:`${config.ENV_PATH}`});//This is for Testing environment configuration

const chai = require('chai');
setDefaultTimeout(120000);

declare global {
    var actionDriver: any;
}
BeforeAll(async () => {
    global.expect_ = chai.expect;
});

Before(async () => {
    global.actionDriver = DriverFactory.driverInstance({ driverName:env("DRIVER_NAME"), browserType:env("BROWSER_TYPE")});
    await global.actionDriver.initialize(config.IS_BROWSER_MODE_HEADLESS);
    await global.actionDriver.openURL(env("APP_URL"));
});

After(async ()=> {
    await global.actionDriver.closeBrowser();
})

AfterStep(async function(scenario){
    if(scenario.result.status !== Status.PASSED){
        const screenshot=await global.actionDriver.takeScreenshot({ path: `${config.SCREENSHOT_PATH}/${scenario.pickle.name.replaceAll('"',"_")}.png`, fullPage: true }); 
        this.attach(screenshot, "image/png");
    }
});


AfterAll(async () => {
   //
});