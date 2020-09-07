import { IAppState } from "models/IAppState";
import {
    setNewsPaginationRoutine,
    loadNewsListRoutine,
    setCurrentNewsRoutine,
    loadNewsByIdRoutine
} from "sagas/news/routines";
import { combineReducers } from "redux";
import {INewsItem} from "../../models/news";

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

const currentNewsReducer =
    (state: IAppState['news']['current'] = { get: {} as INewsItem, comments: [], isLoading: false }, action) => {
    switch (action.type) {
        case setCurrentNewsRoutine.TRIGGER:
            return {
                ...state,
                get: action.payload,
                comments: [],
                isLoading: false
            };
        /* case loadCommentsByNewsIdRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case loadCommentsByNewsIdRoutine.SUCCESS:
            return {
                ...state,
                comments: [...state.comments, ...action.payload],
                isLoading: false
            };
        case loadCommentsByNewsIdRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };*/
        case loadNewsByIdRoutine.TRIGGER:
        case loadNewsByIdRoutine.FAILURE:
            return {
                ...state
            };
        case loadNewsByIdRoutine.SUCCESS:
            return {
                ...state,
                get: action.payload
            };
        default:
            return state;
    }
};

const newsReducers = combineReducers({
    list: newsListReducer,
    current: currentNewsReducer
});

export default newsReducers;
