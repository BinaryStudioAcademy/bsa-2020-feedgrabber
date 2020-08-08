import {getUserRoutine, loginRoutine, logoutRoutine, registerRoutine} from "./routines";

const authAndProfileReducer = (state = {}, {type, payload}) => {
    if (type === loginRoutine.SUCCESS
        || type === registerRoutine.SUCCESS
        || type === getUserRoutine.SUCCESS) {
        return {
            ...state,
            info: payload,
            isLoading: false
        };
    }
    if (type === loginRoutine.FAILURE
        || type === registerRoutine.FAILURE
        || type === getUserRoutine.FAILURE) {
        return {
            ...state,
            error: payload,
            isLoading: false
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
    return state;
};

export default authAndProfileReducer;
