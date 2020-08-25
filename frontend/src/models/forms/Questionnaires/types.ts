import {IPaginationInfo} from "../../IPaginationInfo";
import {IQuestion} from "../Questions/IQuesion";
import { ISection } from "../Sections/types";

export interface IQuestionnairesState {
    list?: IQuestionnairesListState;
    current?: {
        get?: IQuestionnaire;
        questions?: IQuestion[];
        sections?: ISection[];
        isLoading?: boolean;
    };
    currentQuestion?: IQuestion;
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
