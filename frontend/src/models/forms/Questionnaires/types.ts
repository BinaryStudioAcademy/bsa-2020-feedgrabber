import { IPaginationInfo } from "../../IPaginationInfo";
import { IQuestion } from "../Questions/IQuesion";

export interface IQuestionnairesState {
  list?: IQuestionnairesListState;
  current?: {
    get?: IQuestionnaire;
    questions?: IQuestion[];
    isLoading?: boolean;
  };
  currentQuestion?: IQuestion;
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
  questions?: IQuestion[];
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
