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
  data: IQuestionReportRadioData | IQuestionReportFreeTextData | IQuestionReportMultichoiceData; // serialized from JSON
}

export interface IQuestionReportMultichoiceData {
  options: {title: string; amount: number}[];
}

export interface IQuestionReportRadioData {
  options: {title: string; amount: number}[];
}

export interface IQuestionReportFreeTextData {
  values: string[];
}
