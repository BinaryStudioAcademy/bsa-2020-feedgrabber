import {IUserShort} from "../user/types";

export interface IComment {
    id: string;
    body: string;
    newsId: string;
    user: IUserShort;
    createdAt?: Date;
}
