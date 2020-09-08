import {QuestionType} from "../forms/Questions/IQuesion";

export interface IQuestionnaireReport {
    questionnaire: IQuestionnaireDto;
    questions: IQuestionReport[];
    powerPointLink: MsLink;
    excelLink: MsLink;
}

type MsLink = {
    requestId: string;
    link: string;
    key: string;
}

type IQuestionnaireDto = {
    companyName: string;
    id: string;
    questions: QuestionDto[];
    title: string;
}

export type QuestionDto = {
    id: string;
    name: string;
    categoryTitle: string;
    details: any; // will be parsed to object from string
    type: QuestionType;
}

type UserShortDto = {
    id: string;
    username: string;
    // TODO avatar: string;
}

export interface IRequestShort {
    requestId: string;
    questionnaireTitle: string;
    targetUser: UserShortDto;
    requestMaker: UserShortDto;
    creationDate: string;
    expirationDate: string;
    generateReport: boolean;
    notifyUsers: boolean;
    closeDate: string;
    userCount: number;
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

export interface IReportShort {
  id: string;
  title: string;
  author: string;
  closeDate: string;
}

export interface IQuestionReportMultichoiceData {
    options: { title: string; amount: number }[];
}

export interface IQuestionReportRadioData {
    options: { title: string; amount: number }[];
}

export interface IRespondentReportPreview {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    answeredAt: string;
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
