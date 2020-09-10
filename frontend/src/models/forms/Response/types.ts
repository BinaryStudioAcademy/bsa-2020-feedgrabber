import {QuestionType} from "../Questions/IQuesion";

export interface IAnswer<T extends IAnswerBody> {
    questionId: string;
    type: QuestionType;
    body: T;
}

type FreeTextAnswer = string;

type CheckBoxAnswer = {
    selected: string[];
    other: string;
}

type RadioAnswer = {
    selected: string;
    other: string;
}

// urls to imgur
type FileAnswer = string[];

// date in utc
type DateAnswer = string;

type ScaleAnswer = number;

export type IAnswerBody = FreeTextAnswer | CheckBoxAnswer | FileAnswer | DateAnswer | ScaleAnswer | RadioAnswer;

