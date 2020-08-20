import { IQuestionnaire } from "../Questionnaires/types";

export interface IAnswer<T> {
    questionId: string;
    text: T;
    responseId: string;
}

export interface IQuestionnaireResponse {
    requestId: string;
    id?: string;
    questionnaire: IQuestionnaire;
}

export interface IQuestionnaireResponseState {
    list?: IQuestionnaireResponse[];
    current?: IQuestionnaireResponse;
    isLoading: boolean;
}