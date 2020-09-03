import { IUserShort } from "models/user/types";
import { IPaginationInfo } from "models/IPaginationInfo";

export interface INewsItem {
    id: string;
    title: string;
    image: string;
    type: string;
    body: string;
    user: IUserShort;
    date: string;
}

export interface INewsListState {
    pagination?: IPaginationInfo<INewsItem>;
    isLoading: boolean;
}

export interface INewsFeedState {
    list: INewsListState;
    current: INewsItem;
}