import {IQuestion, QuestionType} from "../forms/Questions/IQuesion";

export interface IQuestionnaireReport {
  questionnaireTitle: string;
  questions: IQuestionReport[];
}

export interface IQuestionReport {
  id: string;
  title: string;
  type: QuestionType.radio;
  answers: number;
  data: IQuestionReportRadioData; // serialized from JSON
}

export interface IQuestionReportRadioData {
  options: {title: string; amount: number}[];
}

export interface IRespondentReport {
  respondent: string;
  answers: IQuestion[];
}

// export interface IRespondentReports {
//   respondentReports: IRespondentReport[];
// }
