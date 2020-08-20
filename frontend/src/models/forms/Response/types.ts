import { IQuestionnaire } from "../Questionnaires/types";

export interface IAnswer<T> {
    questionId: string;
    text: T;
    responseQuestionnaireId: string;
}

export interface IQuestionnaireResponse {
    requestId: string;
    responseId?: string;
    questionnaire: IQuestionnaire;
}

export interface IQuestionnaireResponseState {
    list?: IQuestionnaireResponse[];
    current?: IQuestionnaireResponse;
    isLoading: boolean;
}