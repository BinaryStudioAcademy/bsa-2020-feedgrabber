import { createRoutine } from 'redux-saga-routines';

export const loadTeamsRoutine = createRoutine('TEAMS:LOAD');
export const createTeamRoutine = createRoutine('TEAMS:CREATE');
export const showModalTeamsRoutine = createRoutine('TEAMS:SHOW_MODAL');
export const hideModalTeamsRoutine = createRoutine('TEAMS:HIDE_MODAL');
export const loadCompanyUsersRoutine = createRoutine('TEAMS:LOAD_COMPANY_USERS');