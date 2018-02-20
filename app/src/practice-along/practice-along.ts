import { inject } from "aurelia-framework";
import { DbService } from "dataservices/db-service";
import * as _ from "lodash";
import { VoiceHelpers } from "helpers/voice-helpers";

const QuestionStates = {
    Question: "question",
    Answer: "answer"
};

@inject(DbService)
export class PracticeAlong {
    playing: boolean;

    questionTimeoutId: NodeJS.Timer;
    currentQuestion: IQuestion;
    selectedQuestions: IQuestion[];

    activity: IActivity;

    voices: { [lang: string]: SpeechSynthesisVoice } = {};

    constructor(private db: DbService) { }

    async activate({ activityId }) {
        this.activity = await this.db.activities.findById(activityId);

        let voices = await VoiceHelpers.getVoices();
        this.voices.es = voices.find(v => ["es-es", "es-us"].includes(v.lang.toLocaleLowerCase()));
        this.voices.en = voices.find(v => ["en-us"].includes(v.lang.toLocaleLowerCase()));
    }



    unbind() {
        clearInterval(this.questionTimeoutId);
    }

    stopActivity() {
        clearTimeout(this.questionTimeoutId);
        this.currentQuestion = null;
        this.playing = false;
    }

    restartActivity() {
        this.stopActivity();
        this.playActivity();
    }

    getSelectedQuestions() {
        return _(this.activity.questions)
            //.filter(f => f.selected)
            .flatMap(f => Array(1).fill(f))
            .value();
    }

    async playQuestion() {
        if (!this.selectedQuestions.length) {
            this.selectedQuestions = this.getSelectedQuestions();
        }

        let randomQuestionIndex = this.generateRandom(this.selectedQuestions.length - 1);
        this.currentQuestion = this.selectedQuestions[randomQuestionIndex];
        this.selectedQuestions.splice(randomQuestionIndex, 1);

        this.currentQuestion.state = QuestionStates.Question
        await VoiceHelpers.readOutloud(this.currentQuestion.question, this.voices[this.currentQuestion.questionLang || "en"]);

        this.questionTimeoutId = setTimeout(async () => {
            this.currentQuestion.state = QuestionStates.Answer;
            await VoiceHelpers.readOutloud(this.currentQuestion.answer, this.voices[this.currentQuestion.answerLang || "en"]);

            //play next question
            this.questionTimeoutId = setTimeout(() => {
                this.playQuestion();
            }, 2500);

        }, (this.currentQuestion.question.length + this.currentQuestion.answer.length) * 200);
    }

    playActivity() {
        this.selectedQuestions = this.getSelectedQuestions();

        if (!this.selectedQuestions.length) {
            this.playing = false;
            return;
        }


        if (this.questionTimeoutId) {
            clearTimeout(this.questionTimeoutId);
        }

        this.playing = true;
        this.playQuestion();
    }

    generateRandom(max): number {
        if (max <= 0) return 0;
        return Math.floor(Math.random() * (max + 1))

    }
}