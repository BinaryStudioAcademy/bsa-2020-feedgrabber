import { registerRoutine } from '../routines';

export default (state = {}, action) => {
    switch (action.type) {
        case (registerRoutine.SUCCESS):
            return {
                ...state,
                user: action.payload,
                isLoading: false
            };
        case (registerRoutine.TRIGGER):
            return {
                ...state,
                isLoading: true
            };
        case (registerRoutine.FAILURE):
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
};