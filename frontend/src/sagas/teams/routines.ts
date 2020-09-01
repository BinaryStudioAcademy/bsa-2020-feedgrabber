import { createRoutine } from 'redux-saga-routines';

export const loadTeamsRoutine = createRoutine('TEAMS:LOAD');
export const loadCompanyUsersRoutine = createRoutine('TEAMS:LOAD_COMPANY_USERS');

export const toggleUserCurrentTeamRoutine = createRoutine('TEAMS:TOGGLE_USER');
export const toggleLeadCurrentTeamRoutine = createRoutine('TEAMS:TOGGLE_LEAD');

export const clearCurrentTeamRoutine = createRoutine('TEAMS:CLEAR_CURRENT');
export const loadCurrentTeamRoutine = createRoutine('TEAMS:LOAD_CURRENT');
export const createTeamRoutine = createRoutine('TEAMS:CREATE');
export const updateTeamRoutine = createRoutine('TEAMS:UPDATE_METADATA');
export const deleteTeamRoutine = createRoutine('TEAMS:DELETE');
