import {createRoutine} from "redux-saga-routines";

export const loadCompanyUsersRoutine = createRoutine('USERS:LOAD');
export const removeUserFromCompanyRoutine = createRoutine('USERS:DELETE');
export const setUsersPaginationRoutine = createRoutine('USERS:SET_PAGINATION');

export const loadFiredUsersRoutine = createRoutine('FIRED_USERS:LOAD');
export const unfireUserRoutine = createRoutine('FIRED_USERS:UNFIRE');
export const setFiredUsersPaginationRoutine = createRoutine('FIRED_USERS:SET_PAGINATION');
