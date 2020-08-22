import { IQuestionnaire } from "../Questionnaires/types";
import { QuestionType } from "../Questions/IQuesion";

export interface IAnswer<T> {
    questionId: string;
    type: QuestionType;
    body: T;
}

type BodyBase = {
    questionId: string;
};

export type FreeTextAnswer = BodyBase & {value: string}
export type CheckBoxAnswer = BodyBase & {value: string[]} // numbers of answer option starting from 0
export type RadioAnswer = BodyBase & {value: string}
export type FileAnswer = BodyBase & {value: string[]} // urls to imgur
export type DateAnswer = BodyBase & {value: string} // date in utc
export type ScaleAnswer = BodyBase & {value: number}

export type IAnswerBody = FreeTextAnswer|CheckBoxAnswer|FileAnswer|DateAnswer|ScaleAnswer|RadioAnswer;

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
