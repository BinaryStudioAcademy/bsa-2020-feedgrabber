export interface IUserState {
    isLoading?: boolean;
    info?: IUserInfo;
    error?: IUserErrors;
}

export interface IUserInfo {
    id: string;
    userName: string;
    companyName: string;
    companyId: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    avatar?: string;
}

export interface IUserErrors {
    login: string;
    register: string;
    getUser: string;
}

