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

type FreeTextAnswer = BodyBase & {value: string}
type CheckBoxAnswer = BodyBase & {value: number[]} // numbers of answer option starting from 0
type RadioAnswer = BodyBase & {value: number}
type FileAnswer = BodyBase & {value: string[]} // urls to imgur
type DateAnswer = BodyBase & {value: string} // date in utc
type ScaleAnswer = BodyBase & {value: number}

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
