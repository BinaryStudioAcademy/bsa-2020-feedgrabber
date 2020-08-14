export interface IAnswer<T> {
    questionId: string;
    text: T;
    responseQuestionnaireId: string;
}

interface IResponseQuestionnaire<T> {
    id?: string;
    respondentId: string; // userStateId
    requestId?: string;
    answers: IAnswer<T>[];
}