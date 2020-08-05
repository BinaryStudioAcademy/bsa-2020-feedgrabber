import {
  LOGIN,
  SET_IS_LOADING,
  SET_USER
} from './actionTypes';
import { IAuthData } from "../../models/IAuthData";

export const login = (authData: IAuthData) => ({
  type: LOGIN,
  authData
});

export const setIsLoading = (isLoading: boolean) => ({
  type: SET_IS_LOADING,
  isLoading
});

// to do set type of user
export const setUserAction =  (user: any) => ({
  type: SET_USER,
  user
})