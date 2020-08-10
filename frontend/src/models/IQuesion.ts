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
  min: number;
  minDescription: string;
  max: number;
  maxDescription: string;
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

export type IQuestion =
  | IMultichoiceQuestion
  | ITextQuestion
  | IScaleQuestion
  | IRadioQuestion
  | ICheckboxQuestion;

export enum QuestionType {
  freeText = "free_text",
  radio = "radio",
  scale = "scale",
  checkbox = "checkbox",
  multichoice = "multichoice"
}