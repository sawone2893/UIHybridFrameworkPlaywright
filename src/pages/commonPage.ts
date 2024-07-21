import { FileHandler } from "../utilities/fileHandler";

export class CommonPage{

    pageObject={
        tagWithAttribute:(tagName:string,attributeName:string,value:string)=>`//${tagName}[@${attributeName}='${value}']`,
        buttonWithText:(btnName:string)=>`//button[contains(.,'${btnName}')]`,
        tagWithText:(tagName:string,textValue:string,index=1)=>`//${tagName}[contains(.,'${textValue}')][${index}]`,
        tagWithExactText:(tagName:string,textValue:string,index=1)=>`//${tagName}[normalize-space()='${textValue}'][${index}]`,
        /*@param menuBarClassName can have values like taskMenuBar,homeMenuBar,main-toolbar-page  etc..*/
        menuBarOption:(menuBarClassName:string,optionName:string)=>`//div[@class='${menuBarClassName}']//span[contains(.,'${optionName}')]`,
        tabControl:(tabName:string)=>`//div[@class='tabControl']//td[text()='${tabName}']`,
        tagWithPartialAttribute:(tagName:string,attributeName:string,value:string)=>`//${tagName}[contains(@${attributeName},'${value}')]`,
        textField:(fieldTagName:string,fieldName:string,index=1)=>`(//${fieldTagName}[contains(text(),'${fieldName}')]/following::input)[${index}]`,
        //dialogName- can have value like Components Dialog,
        dialogMainViewElementText:(dialogName:string,tagName:string,tagText:string,index=1)=>`(//div[@role='dialog' and not(contains(@style, 'display: none'))]//span[text()='${dialogName}']/following::div[contains(@id,'dialogMainView')]//${tagName}[text()='${tagText}'])[${index}]`,
        dialogMainViewElementTextWithContains:(dialogName:string,tagName:string,tagText:string,index=1)=>`(//div[@role='dialog' and not(contains(@style, 'display: none'))]//span[contains(text(), "${dialogName}")]/following::div[contains(@id,'dialogMainView')]//${tagName}[text()='${tagText}'])[${index}]`,
        dialogMainViewElementAttribute:(dialogName:string,tagName:string,attributeName:string,attributeValue:string,index=1)=>`(//div[@role='dialog' and not(contains(@style, 'display: none'))]//span[text()='${dialogName}']/following::div[contains(@id,'dialogMainView')]//${tagName}[contains(@${attributeName},'${attributeValue}')])[${index}]`,
        popUpMessageText:(dialogName:string)=>`//span[text()='${dialogName}']/following::div[contains(@id,'dialogMainView')]/div[1]`,
        comboboxDropdownOptionWithEcparentcomp: (ecparentcompName:string,ecValue: string) =>`//div[@class='combobox-dropdown' and contains(@ecparentcomp,'${ecparentcompName}')]//td[@ec_value='${ecValue}']`,
        //dropdownClassName can be like combobox-dropdown or userlist-dropdown
        dropdownOptionWithFieldName: (dropdownFieldTagName:string,dropdownFieldName:string,dropdownClassName:string,ecValue: string) =>`//${dropdownFieldTagName}[contains(text(),'${dropdownFieldName}')]/following::div[@class='${dropdownClassName}' and not(contains(@style,'display:none'))]//td[@ec_value='${ecValue}']`,
        formFieldWithIcon: (fieldTagName:string,formFieldName: string, iconClassName: string,index=1) =>`(//${fieldTagName}[contains(text(),'${formFieldName}')]/following::span[contains(@class,'${iconClassName}')])[${index}]`,
        checkBoxOrRadioButtonField:(textTagName:string,textValue:string)=>`//${textTagName}[text()='${textValue}']/preceding::input[1]`,
        radioButtonWithFieldName:(radioBtnFieldTagName:string,radioBtnFieldName:string,radioBtnValue:string)=>`//${radioBtnFieldTagName}[contains(text(),'${radioBtnFieldName}')]/following::label[text()='${radioBtnValue}'][1]/preceding::input[1]`,
        menuBar:(menuBarClassName:string,menuBarItemName:string)=>`//div[@class='${menuBarClassName}']//span[normalize-space()='${menuBarItemName}']`,
        subMenuBar:(subMenuBarItemName:string)=>`(//div[@class='sub']//span[normalize-space()='${subMenuBarItemName}'])[1]`,
        tableCellValue: (columnName: string, columnValue: string) => `//td[text()='${columnName}']/following-sibling::td[contains(text(), '${columnValue}')]`,
        anyFieldWithFormLabel:(fieldTagName:string,fieldName:string,followingFieldTag: string,index=1)=>`//${fieldTagName}[(text()='${fieldName}')]/parent::td//following-sibling::td//${followingFieldTag}[${index}]`,
        spinner: `//div[@id='ec_default_ajax_status:busy']`,
        iFrameWorkFlow: (frameIndex: string) => `(//table[@id='mf:workFlowTabPane']//iframe)[${frameIndex}]`,
        selectedOption: (attributeName:string,value:string, option: string)=>`//select[contains(@${attributeName},'${value}')]/option[text() = '${option}' and @selected='selected']`
    }

    async selectDialogMainViewComboboxDropdown(dialogMainViewName:string,ecparentcompName:string,ecValue: string){
        await global.actionDriver.clickElement(this.pageObject.dialogMainViewElementAttribute(
            dialogMainViewName,
            "a",
            "class",
            "listEntryField"
          ));
        await global.actionDriver.clickElement(this.pageObject.comboboxDropdownOptionWithEcparentcomp(ecparentcompName,ecValue));
    }

    async comboboxDropdown(dropdownFieldTagName:string,dropdownFieldName:string,dropdownClassName:string,ecValue:string){
        await global.actionDriver.clickElement(this.pageObject.formFieldWithIcon(dropdownFieldTagName,dropdownFieldName,"triangle-1-s"));
        await global.actionDriver.clickElement(this.pageObject.dropdownOptionWithFieldName(dropdownFieldTagName,dropdownFieldName,dropdownClassName,ecValue));
    }

    async selectCheckBox(status:string,checkboxName:string){
        //checkboxName:tagName,Checkbox Text value
        const values=checkboxName.split(",");
        const checkboxNameTemp = await FileHandler.getKeyValue(values[1]) || values[1];
        if(status==="checked"){
            if(await global.actionDriver.isElementSelected(this.pageObject.checkBoxOrRadioButtonField(values[0],checkboxNameTemp))===false){
                await global.actionDriver.clickElement(this.pageObject.checkBoxOrRadioButtonField(values[0],checkboxNameTemp));
            }
        }else{
            if(await global.actionDriver.isElementSelected(this.pageObject.checkBoxOrRadioButtonField(values[0],checkboxNameTemp))===true){
                await global.actionDriver.clickElement(this.pageObject.checkBoxOrRadioButtonField(values[0],checkboxNameTemp));
            }
        }
    }

    async changeScreenControl(screenControl:string, frameLocator?: string) {
        await global.actionDriver.setPresentScreen(screenControl);
        if(screenControl=="Frame") {
            global.frameLocator = frameLocator;
        }
    }

}