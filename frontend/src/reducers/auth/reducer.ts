import {
    getUserRoutine,
    loginRoutine,
    logoutRoutine,
    registerRoutine,
    getUserShortRoutine
} from "../../sagas/auth/routines";
import {IAppState} from "../../models/IAppState";
import {
    editUserProfileRoutine, getUserSettingsRoutine,
    updateUserPasswordRoutine,
    updateUserSettingsRoutine,
    uploadUserAvatarRoutine
} from "../../sagas/user/routines";

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
            info: undefined,
            isLoading: false
        };
    }
    if (type === registerRoutine.FAILURE) {
        return {
            ...state,
            error: {...state.error, register: payload},
            isLoading: false
        };
    }
    if (type === loginRoutine.FAILURE) {
        return {
            ...state,
            error: {...state.error, login: payload},
            isLoading: false
        };
    }
    if (type === getUserRoutine.FAILURE) {
        return {
            ...state,
            error: {...state.error, getUser: payload},
            isLoading: false
        };
    }
    if (type === "SET_USER_EMAIL") {
        return {
            ...state,
            info: {...state.info, email: payload}
        };
    }
    if (type === uploadUserAvatarRoutine.SUCCESS
        || type === editUserProfileRoutine.SUCCESS
        || type === updateUserPasswordRoutine.SUCCESS
        || type === updateUserPasswordRoutine.SUCCESS) {
      return {
        ...state,
        info: payload
      };
    }
    if(type === getUserShortRoutine.TRIGGER) {
        return {
            ...state,
            isLoading: true
        };
    }
    if(type === getUserShortRoutine.SUCCESS) {
        return {
          ...state,
          isLoading: false,
          shortInfo: payload
        };
    }
    if(type === getUserShortRoutine.FAILURE) {
        return {
            ...state,
            isLoading: false,
            error: {...state.error, getUser: payload}
        };
    }
    if(type === getUserSettingsRoutine.SUCCESS
        || type === updateUserSettingsRoutine.SUCCESS) {
        return {
            ...state,
            settings: payload
        };
    }

    return state;
};

export default authAndProfileReducer;
