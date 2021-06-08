import Datastore, { MongoDocument } from "react-native-local-mongodb";

class Database {
    private db: Datastore;

    public constructor() {
        this.db = new Datastore({ filename: 'sleep-entries', autoload: true });
    }

    private dateQuery(day: Date) {
        return {
            "date": day
        }
    }

    public getSleepEntry(day: Date) {
        return this.db.findOneAsync({"date": day});
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