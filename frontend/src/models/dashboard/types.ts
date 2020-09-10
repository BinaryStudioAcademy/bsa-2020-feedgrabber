import {IUserShortInfo} from "../user/types";
import {IQuestionnaireInfo} from "../forms/Questionnaires/types";
import {ITeamShort} from "../teams/ITeam";

export interface IDashboardData {
  companyName: string;
  users: IUserShortInfo[];
  questionnaires: IQuestionnaireInfo[];
  teams: ITeamShort[];
}