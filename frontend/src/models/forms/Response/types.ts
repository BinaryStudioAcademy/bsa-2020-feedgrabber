import { IQuestionnaire } from "../Questionnaires/types";

export interface IAnswer<T> {
    questionId: string;
    body: T;
}

export interface IQuestionnaireResponse {
    id?: string;
    requestId: string;
    questionnaire: IQuestionnaire;
}

export interface IQuestionnaireResponseState {
    list?: IQuestionnaireResponse[];
    current?: IQuestionnaireResponse;
    isLoading: boolean;
}