import { ICompany } from "./ICompany";
import {IUser} from "./IUser";

export interface ITeam {
  id: string;
  name: string;
  company: ICompany;
  members: IUser[];
}
