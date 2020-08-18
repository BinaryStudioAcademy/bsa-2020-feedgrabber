import {
  getUserRoutine,
  loginRoutine,
  logoutRoutine,
  registerRoutine,
  uploadUserAvatarRoutine
} from "../../sagas/auth/routines";
import {IAppState} from "../../models/IAppState";

const initialState = {
    isLoading: false
};

const authAndProfileReducer = (state: IAppState['user'] = initialState, {type, payload}) => {
    if (type === loginRoutine.SUCCESS
        || type === registerRoutine.SUCCESS) {
        return {
            ...state,
            info: undefined,  // to load user details after login, currently - different DTO after login and getUser
            isLoading: false,
            error: {}
        };
    }
    if (type === getUserRoutine.SUCCESS) {
        return {
            ...state,
            info: payload,
            isLoading: false,
            error: {}
        };
    }
    if (type === loginRoutine.TRIGGER
        || type === registerRoutine.TRIGGER
        || type === getUserRoutine.TRIGGER) {
        return {
            ...state,
            isLoading: true
        };
    }
    if (type === logoutRoutine.SUCCESS) {
        return {
            ...state,
            info: undefined
        };
    }
    if (type === registerRoutine.FAILURE) {
        return {
            ...state,
            error: {...state.error, register: payload}
        };
    }
    if (type === loginRoutine.FAILURE) {
        return {
            ...state,
            error: {...state.error, login: payload}
        };
    }
    if (type === getUserRoutine.FAILURE) {
        return {
            ...state,
            error: {...state.error, getUser: payload}
        };
    }
    if (type === "SET_USER_EMAIL") {
        return {
            ...state,
            info: {...state.info, email: payload}
        };
    }
    if (type === uploadUserAvatarRoutine.SUCCESS) {
      return {
        ...state,
        info: {...state.info, avatar: payload}
      };
    }
  return state;
};

export default authAndProfileReducer;
