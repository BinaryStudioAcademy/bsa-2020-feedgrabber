import { IQuestionnaire } from "../Questionnaires/types";
import { QuestionType } from "../Questions/IQuesion";

export interface IAnswer<T extends IAnswerBody> {
    questionId: string;
    type: QuestionType;
    body: T;
}

type BodyBase = { questionId: string; type: QuestionType }

type FreeTextAnswer = BodyBase & {
    body: string;
}

type CheckBoxAnswer = BodyBase & {
    body: {
        selected: string[];
        other: string;
    };
}

type RadioAnswer = BodyBase & {
    body: {
        selected: string;
        other: string;
    };
}

// urls to imgur
type FileAnswer = BodyBase & {
    body: string[];
}

// date in utc
type DateAnswer = BodyBase & {
    body: string;
}

type ScaleAnswer = BodyBase & {
    body: number;
}

export type IAnswerBody = FreeTextAnswer | CheckBoxAnswer | FileAnswer | DateAnswer | ScaleAnswer | RadioAnswer;

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
