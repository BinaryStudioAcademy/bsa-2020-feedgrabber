import {QuestionType} from "../forms/Questions/IQuesion";

export interface IQuestionReport {
  id: string;
  title: string;
  type: QuestionType;
  statistics: string; // JSON
}

export interface IQuestionnaireReport {
  questionnaireTitle: string;
  questions: IQuestionReport[];
}
