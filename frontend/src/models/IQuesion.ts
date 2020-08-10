export interface IQuestionBase {
  id: string;
  name: string;
  categoryId: string;
  type: QuestionType;
}

export interface IRadioQuestion extends IQuestionBase {
  type: QuestionType.radio;
  answerOptions: string[];
}

export interface IScaleQuestion extends IQuestionBase {
  type: QuestionType.scale;
}

export interface ITextQuestion extends IQuestionBase {
  type: QuestionType.freeText;
}

export interface IMultichoiceQuestion extends IQuestionBase {
  type: QuestionType.multichoice;
  answerOptions: string[];
}

export interface ICheckboxQuestion extends IQuestionBase {
  type: QuestionType.checkbox;
  answerOptions: string[];
}

export interface IDateQuestion extends IQuestionBase {
  type: QuestionType.date;
}

export type IQuestion =
  | IMultichoiceQuestion
  | ITextQuestion
  | IScaleQuestion
  | IRadioQuestion
  | ICheckboxQuestion
  | IDateQuestion;

export enum QuestionType {
  freeText = "free_text",
  radio = "radio",
  scale = "scale",
  checkbox = "checkbox",
  multichoice = "multichoice",
  date = "date"
}