import { IUserShort } from "models/user/types";
import { IPaginationInfo } from "models/IPaginationInfo";
import {IComment} from "../comments";

export interface INewsItem {
    id: string;
    title: string;
    image: string;
    type: string;
    body: string;
    user: IUserShort;
    commentsCount: number;
    date: string;
    comments?: IComment[];
}

export interface INewsListState {
    pagination?: IPaginationInfo<INewsItem>;
    isLoading: boolean;
}

export interface INewsFeedState {
    list?: INewsListState;
    current?: {
        get: INewsItem;
        comments?: IComment[];
        isLoading: boolean;
    };
}
