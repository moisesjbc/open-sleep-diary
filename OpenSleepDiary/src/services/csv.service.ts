import { SleepEntryField } from '../types/SleepEntryField';
import database from '../database/database';

export function exportToCsvFile(startDate: Date, endDate: Date) {
    database.getSleepEntries(startDate, endDate).then((values) => {
        console.log('THEN', values)
        _exportToCsv(values);
    }).catch(err => {
        console.error(err);
    });
}

const MAX_WAKE_UPS = 5;

function _exportToCsv(sleepEntries: Array<Object>) {
    const csvRows: Array<string> = [];

    const COLUMNS_DATA: Array<[string, string, Function?]> = [
        [SleepEntryField.DATE, "Date", (date: Date) => `"${padNumber(date.getDate(), 2)}/${padNumber(date.getMonth() + 1, 2)}/${date.getFullYear()}"`],
        [SleepEntryField.NAP_DURATION, "Nap"],
        [SleepEntryField.EXERCISE, "Excercise"],
        [SleepEntryField.SHOWER, "Shower"],
        [SleepEntryField.DINNER, "Dinner", (dinner: Array<string>) => '"' + dinner.join(', ') + '"'],
        [SleepEntryField.MEDICINE, "Medicine"],
        [SleepEntryField.PC_LEFT_AT, "PC left at"],
        [SleepEntryField.NOTES, "Notes", (notes: Array<string>) => '"' + notes.join(', ') + '"'],
        [SleepEntryField.START_TIME, "Start time"],
        [SleepEntryField.WAKE_UPS, "Wake ups", wakeUpsToStr],
        [SleepEntryField.WAKE_UP_STATUS, "Wake up status"]
    ];

    let headerRow = "";
    COLUMNS_DATA.slice(0, -1).forEach(columnData => {
        const label = columnData[1];
        headerRow += `"${label}",`
    });
    for (let i=0; i<MAX_WAKE_UPS; i++) {
        headerRow += ',';
    }
    headerRow += `"${COLUMNS_DATA[COLUMNS_DATA.length - 1][1]}"`;
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

    console.log('CSV', csvRows.join('\n'));
}

function padNumber(number: number, maxChars: number): string {
    let numberStr = "" + number;

    while (numberStr.length < maxChars) {
        numberStr = "0" + numberStr;
    }

    return numberStr;
}

function wakeUpsToStr(wakeUps: Array<object>): string {
    let wakeUpsStr = "";
    wakeUpsStr += wakeUps.reduce((accum: String, wakeUp: object) => {
        return `${accum}"${wakeUp['time']} (${wakeUp['note']})",`
    }, "");
    for (let i=wakeUps.length; i<MAX_WAKE_UPS; i++) {
        wakeUpsStr += ',';
    }
    return wakeUpsStr;
}