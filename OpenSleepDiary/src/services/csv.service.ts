import { SleepEntryField } from '../types/SleepEntryField';
import { padNumber } from './number.service';

export function sleepEntriesToCsvStr(sleepEntries: Array<Object>): string {
    const csvRows: Array<string> = [];

    const COLUMNS_DATA: Array<[string, string, Function?]> = [
        [SleepEntryField.DATE, "Date", (date: Date) => `"${padNumber(date.getDate(), 2)}/${padNumber(date.getMonth() + 1, 2)}/${date.getFullYear()}"`],
        [SleepEntryField.NAP_DURATION, "Nap"],
        [SleepEntryField.EXERCISE, "Excercise"],
        [SleepEntryField.SHOWER, "Shower"],
        [SleepEntryField.DINNER, "Dinner", (dinner: Array<string>) => '"- ' + dinner.join('\n-') + '"'],
        [SleepEntryField.MEDICINE, "Medicine"],
        [SleepEntryField.PC_LEFT_AT, "PC left at"],
        [SleepEntryField.NOTES, "Notes", (notes: Array<string>) => '"- ' + notes.join('\n-') + '"'],
        [SleepEntryField.START_TIME, "Start time"],
        [SleepEntryField.WAKE_UPS, "Wake ups", wakeUpsToStr]
    ];

    let headerRow = "";
    COLUMNS_DATA.forEach(columnData => {
        const label = columnData[1];
        headerRow += `"${label}",`
    });
    csvRows.push(headerRow);

    sleepEntries.forEach(sleepEntry => {
        let csvRow: string = "";

        COLUMNS_DATA.forEach(columnData => {
            const [column, label, transformFn] = columnData;
            if (sleepEntry[column]) {
                csvRow += `${transformFn ? transformFn(sleepEntry[column]) : '"' + sleepEntry[column] + '"'},`
            } else {
                csvRow += ",";
            }
        });

        csvRows.push(csvRow);
    });

    return csvRows.join('\n');
}

function wakeUpsToStr(wakeUps: Array<object>): string {
    return wakeUps.reduce((accum: String, wakeUp: object) => {
        return `${accum}"${wakeUp['time']} (${wakeUp['note']})",`
    }, "");
}