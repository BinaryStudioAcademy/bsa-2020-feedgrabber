import {
  loginRoutine,
  setLoadingRoutine
} from './routines';
import { IAuthData } from "../../models/IAuthData";

export const login = (authData: IAuthData) => ({
  type: loginRoutine.TRIGGER,
  authData
});

export const setIsLoading = (isLoading: boolean) => ({
  type: setLoadingRoutine.TRIGGER,
  isLoading
});

// to do set type of user
export const setUserAction =  (user: any) => ({
  type: loginRoutine.SUCCESS,
  user
})