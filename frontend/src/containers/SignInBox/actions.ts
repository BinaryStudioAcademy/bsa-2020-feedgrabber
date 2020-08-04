import {
  LOGIN,
  SET_VALIDATION_ERRORS,
  SET_VALIDATION_ERRORS_SUCCESS,
  SET_IS_LOADING,
  SET_USER
} from './actionTypes';
import { IAuthData } from "../../models/IAuthData";
import { ISignInErrors } from "../../models/ISignInErrors";

export const login = (authData: IAuthData) => ({
  type: LOGIN,
  authData
});

export const setValidationErrorsAction = (errors: ISignInErrors) => ({
  type: SET_VALIDATION_ERRORS,
  errors
});

export const setValidationErrorsSuccess = (errors: ISignInErrors) => ({
  type: SET_VALIDATION_ERRORS_SUCCESS,
  errors
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