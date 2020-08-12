import { ICompany } from "../companies/ICompany";
import {IUserShort} from "../user/types";

export interface ITeam {
  id: string;
  name: string;
  company: ICompany;
  members: IUserShort[];
}
