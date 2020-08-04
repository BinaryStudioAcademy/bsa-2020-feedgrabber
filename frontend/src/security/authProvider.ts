import {
    isLoggedIn,
    setAuthTokens,
    clearAuthTokens, IAuthTokens
} from "axios-jwt";

import axios from "axios";
import {ILoginRequest} from "../models/ILoginRequest";
import {IRegisterRequest} from "../models/IRegisterRequest";
import {IAuthResponse} from "../models/IAuthResponse";

export const login = async (params: ILoginRequest) => authHelper(params, 'login')

export const register = async (params: IRegisterRequest) => authHelper(params, 'register')

export const logout = () => clearAuthTokens()

export const hasAuth = isLoggedIn

const authHelper = async (params: IRegisterRequest | ILoginRequest, path: string) => {
    const res: IAuthResponse = await axios.post(`/auth/${path}`, params)

    setAuthTokens(res as IAuthTokens)
}
