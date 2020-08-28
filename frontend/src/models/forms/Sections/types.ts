import { IQuestion } from "../Questions/IQuesion";

export interface ISection {
    id?: string;
    title: string;
    description?: string;
    from?: number;
    to?: number;
    questions?: IQuestion[];
}