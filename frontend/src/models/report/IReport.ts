import {QuestionType} from "../forms/Questions/IQuesion";

export interface IQuestionnaireReport {
  questionnaireTitle: string;
  questions: IQuestionReport[];
}

export interface IQuestionReport {
  id: string;
  title: string;
  type: QuestionType;
  answers: number;
  data:  // serialized from JSON
    IQuestionReportRadioData |
    IQuestionReportFreeTextData |
    IQuestionReportMultichoiceData |
    IQuestionReportScaleData;
}

export interface IQuestionReportMultichoiceData {
  options: {title: string; amount: number}[];
}

export interface IQuestionReportRadioData {
  options: {title: string; amount: number}[];
}

export interface IQuestionReportScaleData {
  options: {title: string; amount: number}[];
}

export interface IQuestionReportFreeTextData {
  values: string[];
}

export interface IQuestionReportCheckboxData {
  options: {title: string; amount: number}[];
}
