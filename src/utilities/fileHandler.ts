import { promises as fsPromises } from "fs";
import * as config from "../config/config.json";

export class FileHandler {

    static async readDataFromJsonFile(jsonFileLocation: string) {
        try {
            const data = await fsPromises.readFile(jsonFileLocation, 'utf8');
            return data;
        } catch (err) {
            console.log(err)
            return 'Something went wrong'
        }
    }

    static async setKeyValueForFile(jsonFileLocation: string, key: string, value: string) {
        try {
            const data = await fsPromises.readFile(jsonFileLocation, 'utf8');
            const jsonObject = JSON.parse(data);
            jsonObject[key]=value;
            await fsPromises.writeFile(jsonFileLocation, JSON.stringify(jsonObject), 'utf8');
        } catch (error) {
            console.log("Some error", error);
        }
    }

    static async getKeyValueForFile(jsonFileLocation: string, key: string) {    
        try {
            const data = await fsPromises.readFile(jsonFileLocation, 'utf8');
            const jsonObject = JSON.parse(data);
            return jsonObject[key];
        } catch (error) {
            console.log("Some error", error);
        }
    }

    static async setKeyValue(key: string, value: string) {
        return await this.setKeyValueForFile(config.TEST_DATA_PATH, key, value);
    }

    static async getKeyValue(key: string) {
        return await this.getKeyValueForFile(config.TEST_DATA_PATH, key);
    }

}