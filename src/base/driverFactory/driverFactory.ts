
import { UIAction } from "../interface/uiAction";
import { UIPlaywrightActions } from "../modal/uiPlaywrightActions";
export class DriverFactory{

    static driverInstance(option:any):UIAction{
        switch((option.driverName).toLowerCase()){
            case "playwright":return new UIPlaywrightActions(option.browserType);
            default:
                throw new Error(`Unsupported Driver Name: ${option.driverName}`);
        }
    }

}