import { IUserShort } from "models/user/types";

export interface INewsItem {
    id: string;
    title: string;
    image: string;
    type: string;
    body: string;
    author: IUserShort;
    date: string;
}