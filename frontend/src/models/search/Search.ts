import {IQuestionnaire} from "../forms/Questionnaires/types";
import {IQuestionnaireReport} from "../report/IReport";
import {IUserInfo} from "../user/types";
import {IQuestion} from "../forms/Questions/IQuesion";
import {ITeam} from "../teams/ITeam";

export interface ISearchResultState {
    result: ISearchResult;
    isLoading: boolean;
}

export interface ISearchResult {
    questionnaires: IQuestionnaire[];
    reports: IQuestionnaireReport[];
    users: IUserInfo[];
    questions: IQuestion[];
    teams: ITeam[];
}