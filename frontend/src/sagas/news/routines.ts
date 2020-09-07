import {createRoutine} from 'redux-saga-routines';

export const loadNewsListRoutine = createRoutine("NEWS:LOAD_LIST");
export const setNewsPaginationRoutine = createRoutine("NEWS:SET_PAGINATION");
export const setCurrentNewsRoutine = createRoutine("NEWS:SET_CURRENT");
export const loadNewsByIdRoutine = createRoutine("NEWS:LOAD_BY_ID");
