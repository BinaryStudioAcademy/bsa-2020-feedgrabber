import { IAppState } from "models/IAppState";
import { setNewsPaginationRoutine, loadNewsListRoutine } from "sagas/news/routines";

const newsReducer = (state: IAppState['news']['list'] = {isLoading: false}, action) => {
    switch (action.type) {
        case setNewsPaginationRoutine.TRIGGER:
            return {
                ...state,
                pagination: action.payload
            };
        case loadNewsListRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case loadNewsListRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case loadNewsListRoutine.SUCCESS:
            return {
                ...state,
                pagination: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
};

export default newsReducer;