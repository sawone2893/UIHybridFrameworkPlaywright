const dayjs = require("dayjs")

export class DateManager {

  static async getDaysOut(noOfDays: number, dateFormat: string) {
    let today = new Date();
    let dateAfterNDays = new Date(today. setDate(today. getDate() + noOfDays));
    const formattedDate = dayjs(dateAfterNDays).format(dateFormat);
    console.log(`Date: ${formattedDate}`);
    return formattedDate.toString();
  }
}
