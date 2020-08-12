import {IPaginationInfo} from "../../IPaginationInfo";

export interface IQuestionnaire {
  id: string;
  title: string;
  companyName: string;
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
