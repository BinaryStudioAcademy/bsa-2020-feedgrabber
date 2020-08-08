import {loginRoutine, registerRoutine} from "./routines";

const authReducers = (state = {}, {type, payload}) => {
    if (type === loginRoutine.SUCCESS || type === registerRoutine.SUCCESS) {
        return {
            ...state,
            user: payload,
            isLoading: false
        };
    }
    if (type === loginRoutine.FAILURE || type === registerRoutine.FAILURE) {
        return {
            ...state,
            error: payload,
            isLoading: false
        };
    }
    if (type === loginRoutine.TRIGGER || type === registerRoutine.TRIGGER) {
        return {
            ...state,
            isLoading: true
        };
    }
    return state;
};

export default authReducers;
