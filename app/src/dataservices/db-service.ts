import { MongoJsCollection } from "shared/mongo-js/collection";

export class DbService {
    activities: MongoJsCollection<IActivity> = null;

    constructor() {
        Object.keys(this).forEach(collection => { this[collection] = new MongoJsCollection().of(collection); });
    }
}