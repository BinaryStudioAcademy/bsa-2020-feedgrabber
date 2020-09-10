import {IQuestionnaire} from "../forms/Questionnaires/types";
import {IQuestionnaireReport} from "../report/IReport";
import {IQuestion} from "../forms/Questions/IQuesion";
import {ITeam, ITeamShort} from "../teams/ITeam";
import {IUserInfo} from "../user/types";

export interface ISearchResultState {
    result: ISearchResult;
    isLoading: boolean;
    searchQuery: string;
}

export interface ISearchResult {
    questionnaires: IQuestionnaire[];
    reports: IQuestionnaireReport[];
    users: IUserInfo[];
    questions: IQuestion[];
    teams: ITeamShort[];
}