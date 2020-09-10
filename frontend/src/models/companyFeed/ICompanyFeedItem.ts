import { IUserShort } from "../user/types";
import {IComment} from "../comments";

export interface ICompanyFeedItem {
  id?: string;
  title: string;
  body: string;
  type: string;
  createdAt: string;
  image?: { id: string; link: string };
  user: IUserShort;
  commentsCount: number;
  comments?: IComment[];
  reactions: IReaction[];
}

export interface IReaction {
  emoji: string;
  reactedByCurrentUser: boolean;
  reactedUsers: any[];
}

