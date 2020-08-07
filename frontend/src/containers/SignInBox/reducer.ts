import {loginRoutine, registerRoutine} from './routines';

export default (state = {}, action) => {
    switch (action.type) {
        case (loginRoutine.SUCCESS || registerRoutine.SUCCESS):
            return {
                ...state,
                user: action.payload,
                isLoading: false
            };
        case (loginRoutine.TRIGGER || registerRoutine.TRIGGER):
            return {
                ...state,
                isLoading: true
            };
        case (loginRoutine.FAILURE || registerRoutine.FAILURE):
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
};
