import {loginRoutine, logoutRoutine} from '../routines';

export default (state = {}, action) => {
    switch (action.type) {
        case (loginRoutine.SUCCESS):
            return {
                ...state,
                user: action.payload,
                isLoading: false
            };
        case (loginRoutine.TRIGGER):
            return {
                ...state,
                isLoading: true
            };
        case (loginRoutine.FAILURE):
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case logoutRoutine.SUCCESS:
            return {
                ...state,
                user: {}
            };
        default:
            return state;
    }
};
