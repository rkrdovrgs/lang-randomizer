import { inject } from "aurelia-framework";
import { DbService } from "dataservices/db-service";
import { FileService } from "dataservices/file-service";
import * as _ from "lodash";

@inject(DbService, FileService)
export class Home {
    activities: IActivity[];

    constructor(private db: DbService) { }

    async activate() {
        this.activities = _.orderBy(await this.db.activities.find(), s => s.name, "asc");
    }
}

