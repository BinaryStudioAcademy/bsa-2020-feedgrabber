import {createRoutine} from 'redux-saga-routines';

export const loadNewsListRoutine = createRoutine("NEWS:LOAD_LIST");
export const setNewsPaginationRoutine = createRoutine("NEWS:SET_PAGINATION");