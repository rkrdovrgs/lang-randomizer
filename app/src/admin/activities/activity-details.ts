import { inject } from "aurelia-framework";
import { DbService } from "dataservices/db-service";
import * as _ from "lodash";

@inject(DbService)
export class ActivityDetails {
    newQuestion = <IQuestion>{};
    activity: IActivity;

    constructor(private db: DbService) { }

    async activate({ activityId }) {
        if (!activityId) {
            this.activity = <IActivity>{
                name: "",
                questions: []
            };
        } else {
            this.activity = await this.db.activities.findById(activityId);
        }

        this.activity.questions = _.orderBy(
            this.activity.questions,
            [f => f.createdAt],
            ["desc"]
        );

        this.initNewQuestion();
    }

    async saveActivity() {
        if (!this.activity._id) {
            let s = await this.db.activities.insert(this.activity);
            this.activity._id = s._id;
        } else {
            await this.db.activities.updateById(this.activity._id, this.activity);
        }
    }

    async addQuestion() {
        this.newQuestion.createdAt = new Date();
        this.activity.questions.unshift(this.newQuestion);
        this.initNewQuestion();
        this.saveActivity();
    }

    async removeQuestion(index) {
        this.activity.questions.splice(index, 1);
        this.saveActivity();
    }

    initNewQuestion() {
        this.newQuestion = <IQuestion>{
            quesitonLang: "es",
            question: "",
            answerLang: "en",
            answer: ""
        };
    }
}

