import {IQuestion} from "../Questions/types";

export interface IQuestionnairesState {
    list?: IQuestionnairesList;
    current?: {
        get: IQuestionnaire;
        questions: IQuestion[];
    };
    isLoading?: boolean;
}

export interface IQuestionnaire {
    id?: string;
    title: string;
    companyName?: string;
}

export interface IQuestionnairesList {
    isLoading?: boolean;
    items?: IQuestionnaire[];
    modalShown?: boolean;
    modalQuestionnaire?: IQuestionnaire;
    modalLoading?: boolean;
    modalError?: string;
}