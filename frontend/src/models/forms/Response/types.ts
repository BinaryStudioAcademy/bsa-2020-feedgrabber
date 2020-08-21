import {IQuestionnaire} from "../Questionnaires/types";
import {QuestionType} from "../Questions/IQuesion";

export interface IAnswer<T> {
    questionId: string;
    type: QuestionType;
    body: T;
}

type BodyBase = {
    questionId: string;
};

type FreeTextAnswer = BodyBase & { value: string; type: QuestionType.freeText }
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

type FileAnswer = BodyBase & { value: string[]; type: QuestionType.fileUpload } // urls to imgur
type DateAnswer = BodyBase & { value: string; type: QuestionType.date } // date in utc
type ScaleAnswer = BodyBase & { value: number; type: QuestionType.scale }

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
