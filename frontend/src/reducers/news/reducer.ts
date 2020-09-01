import { IAppState } from "models/IAppState";
import { setNewsPaginationRoutine, loadNewsListRoutine } from "sagas/news/routines";
import { combineReducers } from "redux";

const initialState = {
    isLoading: false
};

const newsListReducer = (state: IAppState['news']['list'] = initialState, action) => {
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

const newsReducer = combineReducers({
    list: newsListReducer
});

export default newsReducer;