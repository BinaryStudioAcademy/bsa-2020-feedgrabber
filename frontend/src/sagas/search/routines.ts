import { createRoutine } from 'redux-saga-routines';

export const searchOverAllEntities = createRoutine('SEARCH:FIND_ALL');
export const updateSearchQuery = createRoutine('SEARCH:UPDATE_QUERY');
