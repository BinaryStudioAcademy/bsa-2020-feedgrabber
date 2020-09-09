import {IPaginationInfo} from "../IPaginationInfo";
import {IUserInfo} from "../user/types";

export interface IUsersState {
  pagination?: IPaginationInfo<IUserInfo>;
  isLoading?: boolean;
  paginationFired?: IPaginationInfo<IUserInfo>;
  isFiredLoading?: boolean;
}
