import Datastore, { MongoDocument } from "react-native-local-mongodb";

class Database {
    private db: Datastore;

    public constructor() {
        this.db = new Datastore({ filename: 'sleep-entries', autoload: true });
    }

    public getSleepEntry(day: Date) {
        const nextDay = new Date(day);
        nextDay.setDate(nextDay.getDate() + 1);;
        const query = {
            "date": {
                "$gte" : day, 
                "$lt" : nextDay
            }
        }
        return this.db.findOneAsync(query);
    }

    public saveSleepEntry(data: MongoDocument) {
        if (data._id) {
            const nextDay = new Date(data.date);
            nextDay.setDate(nextDay.getDate() + 1);;
            const query = {
                "date": {
                    "$gte" : data.date, 
                    "$lt" : nextDay
                }
            }
            return this.db.updateAsync(query, data);
        } else {
            return this.db.insertAsync(data);
        }
    }
}

const database = new Database();

export default database;