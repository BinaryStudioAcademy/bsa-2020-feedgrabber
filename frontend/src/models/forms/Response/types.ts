import { IQuestionnaire } from "../Questionnaires/types";
import { QuestionType } from "../Questions/IQuesion";

export interface IAnswer<T> {
    questionId: string;
    type: QuestionType;
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