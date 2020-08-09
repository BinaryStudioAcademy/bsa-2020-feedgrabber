import {IUserErrors, IUserInfo} from "./user/types";

export interface IAppState {
    toastr: any;
    user: {
        isLoading: boolean;
        info: IUserInfo;
        error: IUserErrors;
    };
}
