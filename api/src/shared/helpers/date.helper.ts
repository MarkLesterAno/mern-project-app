import moment, { Moment, MomentInput } from 'moment-timezone';

/**
 * DateTimeHelper is a utility class for working with dates and times using Moment.js.
 */
export default class DateTimeHelper {
    /**
     * Get the current date and time.
     * @returns The current date and time as a Moment object.
     */

    // // Example usage
    // const currentDateTime = DateTimeHelper.getCurrentDateTime();
    // console.log('Current Date and Time:', DateTimeHelper.getFormatted('YYYY-MM-DD HH:mm:ss'));
    static getCurrentDateTime(): Moment {
        return moment();
    }
    // // Additional Examples
    // 'Year Formats:');
    // 'YYYY:', DateTimeHelper.getFormatted('YYYY'));
    // 'YY:', DateTimeHelper.getFormatted('YY'));

    // 'Month Formats:');
    // 'MM:', DateTimeHelper.getFormatted('MM'));
    // 'MMM:', DateTimeHelper.getFormatted('MMM'));
    // 'MMMM:', DateTimeHelper.getFormatted('MMMM'));

    // 'Day Formats:');
    // 'DD:', DateTimeHelper.getFormatted('DD'));
    // 'D:', DateTimeHelper.getFormatted('D'));
    // 'Do:', DateTimeHelper.getFormatted('Do'));

    // 'Hour Formats:');
    // 'HH:', DateTimeHelper.getFormatted('HH'));
    // 'H:', DateTimeHelper.getFormatted('H'));
    // 'hh:', DateTimeHelper.getFormatted('hh'));
    // 'h:', DateTimeHelper.getFormatted('h'));

    // 'Minute Formats:');
    // 'mm:', DateTimeHelper.getFormatted('mm'));
    // 'm:', DateTimeHelper.getFormatted('m'));

    // 'Second Formats:');
    // 'ss:', DateTimeHelper.getFormatted('ss'));
    // 's:', DateTimeHelper.getFormatted('s'));

    // 'Timezone Formats:');
    // 'Z:', DateTimeHelper.getFormatted('Z'));
    // 'ZZ:', DateTimeHelper.getFormatted('ZZ'));

    // 'Day of the Week Formats:');
    // 'ddd:', DateTimeHelper.getFormatted('ddd'));
    // 'dddd:', DateTimeHelper.getFormatted('dddd'));

    // 'Ordinal Indicator Formats:');
    // 'Do:', DateTimeHelper.getFormatted('Do'));
    // 'Mo:', DateTimeHelper.getFormatted('Mo'));

    // 'Miscellaneous Formats:');
    // 'A:', DateTimeHelper.getFormatted('A'));
    // 'X:', DateTimeHelper.getFormatted('X'));

    /**
     * Add a specified number of hours to a given date and time.
     * @param dateTime - The date and time to which hours are added.
     * @param hours - The number of hours to add.
     * @returns The resulting date and time as a Moment object.
     */
    static addHours(dateTime: MomentInput, hours: number): Moment {
        return moment(dateTime).add(hours, 'hours');
    }

    /**
     * Format a given date and time using a specified format.
     * @param dateTime - The date and time to format.
     * @param format - The format string defining the desired output format.
     * @returns The formatted date and time as a string.
     */

    // const futureDateTime = DateTimeHelper.addHours(currentDateTime, 1);
    // console.log('Future Date and Time:', DateTimeHelper.formatDateTime(futureDateTime, 'YYYY-MM-DD HH:mm:ss'));

    static formatDateTime(dateTime: MomentInput, format: string): string {
        return moment(dateTime).format(format);
    }

    /**
     * Get the difference between two dates and times in a specified unit of time.
     * @param startDateTime - The start date and time.
     * @param endDateTime - The end date and time.
     * @param unit - The unit of time to calculate the difference in (e.g., 'hours', 'days', 'months').
     * @returns The difference between the two dates and times in the specified unit.
     */

    // const dateTimeDifference = DateTimeHelper.getDateTimeDifference(currentDateTime, futureDateTime, 'hours');
    // console.log('Difference in Hours:', dateTimeDifference);

    static getDateTimeDifference(startDateTime: MomentInput, endDateTime: MomentInput, unit: moment.unitOfTime.Diff): number {
        return moment(endDateTime).diff(startDateTime, unit);
    }

    /**
     * Convert a given date and time to a Unix timestamp.
     * @param dateTime - The date and time to convert.
     * @returns The Unix timestamp corresponding to the given date and time.
     */

    // const timestamp = DateTimeHelper.toTimestamp(currentDateTime);
    // console.log('Timestamp:', timestamp);

    static toTimestamp(dateTime: MomentInput): number {
        return moment(dateTime).unix();
    }

    /**
     * Convert a Unix timestamp to a Moment object representing the corresponding date and time.
     * @param timestamp - The Unix timestamp to convert.
     * @returns The Moment object representing the date and time corresponding to the given timestamp.
     */

    // const convertedDateTime = DateTimeHelper.fromTimestamp(timestamp);
    // console.log('Converted Date and Time:', DateTimeHelper.formatDateTime(convertedDateTime, 'YYYY-MM-DD HH:mm:ss'));

    static fromTimestamp(timestamp: number): Moment {
        return moment.unix(timestamp);
    }

    /**
     * Convert a given date and time to a specific time zone.
     * @param dateTime - The date and time to convert.
     * @param timeZone - The target time zone (e.g., 'America/New_York').
     * @returns The date and time converted to the specified time zone as a Moment object.
     */

    // const timeZone = 'America/New_York';
    // const timeZoneDateTime = DateTimeHelper.toTimeZone(currentDateTime, timeZone);
    // console.log('Date and Time in Time Zone:', DateTimeHelper.formatDateTime(timeZoneDateTime, 'YYYY-MM-DD HH:mm:ss'));

    static toTimeZone(dateTime: MomentInput, timeZone: string): Moment {
        return moment(dateTime).tz(timeZone);
    }

    /**
     * Get the current date and time formatted with a specified format.
     * @param format - The format string defining the desired output format.
     * @param timeZone - (Optional) The target time zone for formatting. Defaults to the system time zone.
     * @returns The current date and time formatted as a string.
     */
    static getFormatted(format: string, timeZone?: string): string {
        let dateTime = moment();
        if (timeZone) {
            dateTime = dateTime.tz(timeZone);
        }
        return dateTime.format(format);
    }
}













