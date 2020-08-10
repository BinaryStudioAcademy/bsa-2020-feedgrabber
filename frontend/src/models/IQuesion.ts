export interface IQuestionBase {
    id?: string;
    text: string;
    categoryTitle?: string;
    type: QuestionType;
    questionnaireId: string;
    payload?: {};
}

export interface IRadioQuestion extends IQuestionBase {
    type: QuestionType.radio;
    payload: {
        answerOptions: string[];
    };
}

export interface IScaleQuestion extends IQuestionBase {
    type: QuestionType.scale;
    payload: {
        min: number;
        minDescription: string;
        max: number;
        maxDescription: string;
    };
}

export interface ITextQuestion extends IQuestionBase {
    type: QuestionType.freeText;
}

export interface IDropDownQuestion extends IQuestionBase {
    type: QuestionType.dropDown;
    payload: {
        answerOptions: string[];
    };
}

export interface ICheckboxQuestion extends IQuestionBase {
    type: QuestionType.checkbox;
    payload: {
        answerOptions: string[];
    };
}

export interface IMultiChoiceQuestion extends IQuestionBase {
    type: QuestionType.multiChoice;
    payload: {
        answerOptions: string[];
    };
}

export type IQuestion =
    | IDropDownQuestion
    | ITextQuestion
    | IScaleQuestion
    | IRadioQuestion
    | ICheckboxQuestion
    | IMultiChoiceQuestion;

export enum QuestionType {
    freeText = "FREE_TEXT",
    radio = "RADIO",
    scale = "SCALE",
    checkbox = "CHECKBOX",
    dropDown = "DROP_DOWN",
    multiChoice = "MULTI_CHOICE"
}
