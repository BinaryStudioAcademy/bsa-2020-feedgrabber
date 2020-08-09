export interface IQuestionBase {
    id?: string;
    text: string;
    categoryName: string;
    type: QuestionType;
}

export interface IRadioQuestion extends IQuestionBase {
    type: QuestionType.radio;
    payload: {
        answerOption: string[];
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
        answerOption: string[];
    };
}

export interface ICheckboxQuestion extends IQuestionBase {
    type: QuestionType.checkbox;
    payload: {
        answerOption: string[];
    };
}

export interface ICheckboxQuestion extends IQuestionBase {
    type: QuestionType.checkbox;
    payload: {
        answerOption: string[];
    };
}

export interface IMultiChoiceQuestion extends IQuestionBase {
    type: QuestionType.multiChoice;
    payload: {
        answerOption: string[];
    };
}

export type IQuestion =
    | IDropDownQuestion
    | ITextQuestion
    | IScaleQuestion
    | IRadioQuestion
    | ICheckboxQuestion
    | IMultiChoiceQuestion;

enum QuestionType {
    freeText = "FREE_TEXT",
    radio = "RADIO",
    scale = "SCALE",
    checkbox = "CHECKBOX",
    dropDown = "DROP_DOWN",
    multiChoice = "MULTI_CHOICE"
}
