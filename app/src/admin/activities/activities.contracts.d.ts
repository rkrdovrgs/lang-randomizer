interface IActivity {
    _id: string;
    name: string;
    questions: IQuestion[];
}

interface IQuestion {
    _id: string;
    quesitonLang: string;
    question: string;

    answerLang: string;
    answer: string;
    createdAt: Date;

    state: string;
}