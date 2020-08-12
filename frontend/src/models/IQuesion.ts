export interface IMultiAnswerDetails{
  answerOptions: string[];
}
export interface ICheckboxAnswerDetails{
    answerOptions: string[];
    includeOther: boolean;
}

export interface IScaleDetails {
  min: number;
  minDescription: string;
  max: number;
  maxDescription: string;
}

export interface IQuestionBase<TDetails>{
  id: string;
  name: string;
  categoryId: string;
  type: QuestionType;
  details: TDetails;
}

export interface IRadioQuestion extends IQuestionBase<IMultiAnswerDetails> {
  type: QuestionType.radio;
}

export interface IScaleQuestion extends IQuestionBase<IScaleDetails> {
  type: QuestionType.scale;
}

export interface ITextQuestion extends IQuestionBase<{}>{
  type: QuestionType.freeText;
}

export interface IMultichoiceQuestion extends IQuestionBase<IMultiAnswerDetails>{
  type: QuestionType.multichoice;
}

export interface ICheckboxQuestion extends IQuestionBase<ICheckboxAnswerDetails>{
  type: QuestionType.checkbox;
}

export interface IDateQuestion extends IQuestionBase<{}> {
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