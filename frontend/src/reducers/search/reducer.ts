import {ISearchResultState} from "../../models/search/Search";
import {IAppState} from "../../models/IAppState";
import {searchOverAllEntities} from "../../sagas/search/routines";

const initialState: ISearchResultState = {
    result: {
        questionnaires: [],
        questions: [],
        teams: [],
        reports: [],
        users: []
    },
    isLoading: false
};

const searchReducer = (state: IAppState['searchResult'] = initialState, {type, payload}) => {
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
        default:
            return state;
    }
};

export default searchReducer;
