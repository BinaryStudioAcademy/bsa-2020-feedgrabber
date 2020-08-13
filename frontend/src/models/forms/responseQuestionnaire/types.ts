export interface IAnswer {
    questionId: string;
    text: string | string[];
    responseQuestionnaireId?: string;
}

export interface IResponseQuestionnaire {
    id?: string;
    respondentId: string; // userStateId
    requestId?: string;
    answers: IAnswer[];
}