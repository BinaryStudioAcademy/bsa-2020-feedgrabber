import { IPaginationInfo } from "../../IPaginationInfo";
import {IReportShortDto} from "../../report/IReport";

export interface IQuestionnairesState {
  list?: IQuestionnairesListState;
  archived?: IQuestionnairesListState;
  pending?: IRequestState;
}

export interface IRequestState{
  list: IRequest[];
  isLoading: boolean;
}
export interface IRequest {
  id: string;
  questionnaire: IQuestionnaire;
  expirationDate: Date;
  alreadyAnswered: boolean;
}

export interface IQuestionnaire {
    id?: string;
    title: string;
    description?: string;
    companyName?: string;
    isEditingEnabled: boolean;
}

export interface ICreateQuestionnaire {
  title: string;
}

export interface IUpdateQuestionnaire {
  id: string;
  title: string;
}

export interface IQuestionnairesListState {
  isLoading?: boolean;
  pagination?: IPaginationInfo<IQuestionnaire>;
  modalShown?: boolean;
  modalQuestionnaire?: IQuestionnaire;
  modalLoading?: boolean;
  modalError?: string;
}

export interface IQuestionnaireInfo {
  id: string;
  title: string;
  reports: IReportShortDto[];
  archived: boolean;
}