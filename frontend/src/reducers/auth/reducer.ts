import {getUserRoutine, loginRoutine, logoutRoutine, registerRoutine} from "../../sagas/auth/routines";
import {IAppState} from "../../models/IAppState";
import {IUserErrors, IUserInfo} from "../../models/user/types";

const initialState = {
    isLoading: false,
    info: {} as IUserInfo,
    error: {} as IUserErrors
};

const authAndProfileReducer = (state: IAppState['user'] = initialState, {type, payload}) => {
    if (type === loginRoutine.SUCCESS
        || type === registerRoutine.SUCCESS
        || type === getUserRoutine.SUCCESS) {
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
            info: {}
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
    return state;
};

export default authAndProfileReducer;
