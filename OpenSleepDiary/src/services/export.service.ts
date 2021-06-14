import database from '../database/database';
import { StorageAccessFramework } from 'expo-file-system';
import { sleepEntriesToCsvStr } from './csv.service';

export function exportToCsvFile(startDate: Date, endDate: Date) {
    const FILE_NAME = `OpenSleepDiary_${_dateToStr(startDate)}__${_dateToStr(endDate)}.csv`;

    database.getSleepEntries(startDate, endDate).then(async (sleepEntries) => {
        const FILE_CONTENT = sleepEntriesToCsvStr(sleepEntries);

        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
            const FILE_URI = await StorageAccessFramework.createFileAsync(permissions.directoryUri, FILE_NAME, 'text/csv');
            
            await StorageAccessFramework.writeAsStringAsync(FILE_URI, FILE_CONTENT, {encoding: 'utf8'});
        
            alert(`File writen to ${FILE_URI}`);
        }
    }).catch(error => {
        alert(`ERROR trying to export ${FILE_NAME}: ${error}`);
    });
}

function _dateToStr(date: Date): string {
    return `${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}`;
}