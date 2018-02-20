interface IActivity {
    _id: string;
    name: string;
    questions: IQuestion[];
}

interface IQuestion {
    _id: string;
    questionLang: string;
    question: string;

    answerLang: string;
    answer: string;
    createdAt: Date;

    state: string;
}