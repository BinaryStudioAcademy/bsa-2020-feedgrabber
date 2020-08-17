import {createRoutine} from "redux-saga-routines";

export const loadCompanyUsersRoutine = createRoutine('USERS:LOAD');
export const removeUserFromCompanyRoutine = createRoutine('USERS:DELETE');
export const setUsersPaginationRoutine = createRoutine('USERS:SET_PAGINATION');