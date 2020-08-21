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
  data: IQuestionReportRadioData | IQuestionReportFreeTextData | IQuestionReportScaleData; // serialized from JSON
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
