import { IUser } from "components/Header";
import { ICompany } from "./ICompany";

export interface ITeam {
  id: string;
  name: string;
  company: ICompany;
  members: IUser[];
}