import { QuestionType } from "../forms/Questions/IQuesion";

export interface IQuestionnaireReport {
  questionnaireTitle: string;
  questions: IQuestionReport[];
}

type UserShortDto = {
    id: string;
    username: string;
    // TODO avatar: string;
}

export interface IRequestShort {
    requestId: string;
    targetUser: UserShortDto;
    requestMaker: UserShortDto;
    creationDate: string;
    expirationDate: string;
    generateReport: boolean;
    notifyUsers: boolean;
    isClosed: boolean;
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
  IQuestionReportScaleData |
  IQuestionReportFileData;
}

export interface IQuestionReportMultichoiceData {
  options: { title: string; amount: number }[];
}

export interface IQuestionReportRadioData {
  options: { title: string; amount: number }[];
}

export interface IQuestionReportScaleData {
  options: { title: string; amount: number }[];
}

export interface IQuestionReportFreeTextData {
  values: string[];
}

export interface IQuestionReportCheckboxData {
  options: { title: string; amount: number }[];
}

export interface IQuestionReportDateData {
  options: { title: string; amount: number }[];
}

export interface IQuestionReportFileData {
  options: { type: string; amount: number; sizes: number[] }[];
}
