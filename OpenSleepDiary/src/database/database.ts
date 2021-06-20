import Datastore, { MongoDocument } from "react-native-local-mongodb";

class Database {
    private db: Datastore;

    public constructor() {
        this.db = new Datastore({ filename: 'sleep-entries', autoload: true });
    }

    public getSleepEntry(day: Date) {
        return this.db.findOneAsync({"date": day});
    }

    public getSleepEntries(startDate: Date, endDate: Date) {
        return new Promise((resolve, reject) => {
            this.db.findAsync({
                "date": {
                    "$gte": startDate,
                    "$lte": endDate
                }
            }).then(result => {
                resolve(result.sort((a, b) => a['date'] - b['date']))
            }).catch(reject);
        });
    }

    public saveSleepEntry(data: MongoDocument) {
        if (data._id) {
            return this.db.updateAsync({_id: data._id}, data);
        } else {
            return this.db.insertAsync(data);
        }
    }
}

const database = new Database();

export default database;