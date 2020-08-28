import {createRoutine} from "redux-saga-routines";

export const loadCompanyUsersRoutine = createRoutine('USERS:LOAD');
export const removeUserFromCompanyRoutine = createRoutine('USERS:DELETE');
export const setUsersPaginationRoutine = createRoutine('USERS:SET_PAGINATION');
export const loadSearchUserSuggestionsRoutine = createRoutine('USER:LOAD_SUGGESTIONS');
export const clearSuggestionsRoutine = createRoutine('USER:CLEAR_SUGGESTIONS');
export const searchUsersRoutine = createRoutine('USER:SEARCH');
export const setSearchPaginationRoutine = createRoutine('USER:SET_SEARCH_PAGINATION');
