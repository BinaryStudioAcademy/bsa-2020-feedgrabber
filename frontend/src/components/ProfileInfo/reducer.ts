import { getUserRoutine } from './routines';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case (getUserRoutine.SUCCESS):
            return {
                ...state,
                user: action.payload,
                isLoading: false
            };
        case (getUserRoutine.TRIGGER):
            return {
                ...state,
                isLoading: true
            };
        case (getUserRoutine.FAILURE):
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
};

export default userReducer;
