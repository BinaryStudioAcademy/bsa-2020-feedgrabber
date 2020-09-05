import { IUserShort } from "../user/types";
import {IPaginationInfo} from "../IPaginationInfo";

export interface ICompanyFeedItem {
  id?: string;
  title: string;
  body: string;
  type: string;
  createdAt: string;
  image?: string;
  user: IUserShort;
}

// export interface ICompanyFeedListState {
//   pagination?: IPaginationInfo<ICompanyFeedItem>;
//   isLoading: boolean;
// }
