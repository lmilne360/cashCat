 //Take a user's pay day in dd/mm/yyyy format
 // Return an array of the next 10 pay days
 // If the day is a holiday, the payday  should land on the previous day


/** A string constant representing a date. Testing purposes*/
const DATE: string = "10/05/2017";

/**  An array of dates to be considered holidays. Testing purposes */
const HOLIDAYS: Array<string> = ["10/19/2017", "11/09/2017"];

 /** Main function. Take user pay day and returns next 10 pay dates 
  * @param date - A string to represent a date. Formated mm/dd/yyyy 
 */
function getPayDates(date: string): Array<string> {
  let dates: any[] = [];
  let myDate: Date = new Date(date);
  for (let i = 0; i < 10; i++) {
    const newDate = getFormattedDate(addDays(myDate));
    dates.push(checkHoliday(newDate));
  }
  return dates;
}

/** Take a given date and adds a week (7 days) to it 
 * @param startDate - date to be converted 
 * @param days - Optional parameter for amount of days to add. Defaults to a week
*/
function addDays(startDate: Date, days: number = 7): Date {
  const newDate = new Date(startDate.setTime(startDate.getTime() + days * 86400000));
  return newDate;
}

/** Take a given date and removes one day from it
 * @param startDate - date to be converted 
 * @param days - Optional parameter for amount of days to add. Defaults to 1 day
 */
function subtractDays(startDate: Date, days: number = 1 ): Date {
  const newDate = new Date(startDate.setTime(startDate.getTime() - days * 86400000));
  return newDate;
}

/** Convert date into mm/dd/yyyy string */
function getFormattedDate(date: Date): string {
  const year = date.getFullYear();

  /// Add 1 because JavaScript months start at 0
  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  // Keep double digit day format
  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return month + '/' + day + '/' + year;
}

/** Checks if a date falls on a holiday. Self invokes to always return a date that's not a holiday
 * @param date - A date string in mm/dd/yyyy format
 * @param holidays - an array containing holday strings. Defaults to the HOLIDAYS constant
 */
function checkHoliday(date: string, holidays: Array<string> = HOLIDAYS): string {
  if (holidays.includes(date)){
    let newDate = new Date(date);
    newDate = subtractDays(newDate);
    return checkHoliday(getFormattedDate(newDate));
  }
  return date 
}


console.log(getPayDates(DATE))