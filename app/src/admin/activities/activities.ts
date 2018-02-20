import { inject } from "aurelia-framework";
import { DbService } from "dataservices/db-service";
import { FileService } from "dataservices/file-service";
import * as _ from "lodash";

@inject(DbService, FileService)
export class Activities {
    activities: IActivity[];

    constructor(private db: DbService, private fileService: FileService) { }

    async activate() {
        this.activities = _.sortBy(await this.db.activities.find(), s => s.name);
    }

    async removeActivity(index, id) {
        await this.db.activities.removeById(id);
        this.activities.splice(index, 1);
    }
}

