import {ISearchResultState} from "../../models/search/Search";
import {IAppState} from "../../models/IAppState";
import {searchOverAllEntities, updateSearchQuery} from "../../sagas/search/routines";

const initialState: ISearchResultState = {
    result: {
        questionnaires: [],
        questions: [],
        teams: [],
        reports: [],
        users: []
    },
    isLoading: false,
    searchQuery: ''
};

const searchReducer = (state: IAppState['search'] = initialState, {type, payload}) => {
    switch (type) {
        case searchOverAllEntities.SUCCESS:
            return {
                ...state,
                result: payload,
                isLoading: false
            };
        case searchOverAllEntities.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case searchOverAllEntities.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case updateSearchQuery.SUCCESS:
            return {
                ...state,
                searchQuery: payload
            };
        case updateSearchQuery.FAILURE:
            return {
                ...state,
                searchQuery: ''
            };
        default:
            return state;
    }
};

export default searchReducer;
