import { IUserShort } from "../user/types";

export interface ICompanyFeedItem {
  id?: string;
  title: string;
  body: string;
  type: string;
  createdAt: string;
  imageId?: string;
  user: IUserShort;
}

