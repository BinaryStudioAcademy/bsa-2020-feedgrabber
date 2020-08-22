import {IQuestionnaire} from "../Questionnaires/types";
import {QuestionType} from "../Questions/IQuesion";

export interface IAnswer<T extends IAnswerBody> {
    questionId: string;
    type: QuestionType;
    body: T;
}

type BodyBase = {
    questionId: string;
};

type FreeTextAnswer = BodyBase & {
    value: string;
    type: QuestionType.freeText;
}

// numbers of answer option starting from 0
type CheckBoxAnswer = BodyBase & {
    value: {
        selected: number[];
        other: string;
    };
    type: QuestionType.checkbox;
}

type RadioAnswer = BodyBase & {
    value: {
        selected: number;
        other: string;
    };
    type: QuestionType.radio;
}

// urls to imgur
type FileAnswer = BodyBase & {
    value: string[];
    type: QuestionType.fileUpload;
}

// date in utc
type DateAnswer = BodyBase & {
    value: string;
    type: QuestionType.date;
}

type ScaleAnswer = BodyBase & {
    value: number;
    type: QuestionType.scale;
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
