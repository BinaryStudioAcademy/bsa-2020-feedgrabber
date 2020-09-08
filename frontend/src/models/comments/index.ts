import {IUserInfo, IUserShort} from "../user/types";
import {IPaginationInfo} from "../IPaginationInfo";

export interface IComment {
    id: string;
    body: string;
    newsId: string;
    user: IUserShort;
    createdAt?: Date;
}

export interface ICommentsList {
    pagination?: IPaginationInfo<IComment>;
    isLoading?: boolean;
}
