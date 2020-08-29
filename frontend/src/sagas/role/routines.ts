import {createRoutine} from "redux-saga-routines";

export const loadShortRolesRoutine = createRoutine('ROLE:GET');
export const setSelectedUserRoutine = createRoutine('ROLE:SET_SELECTED_USER');
export const changeRoleRoutine = createRoutine('ROLE:CHANGE_USER_ROLE');
export const setIsLoadingRoutine = createRoutine('ROLE:SET_IS_LOADING');
export const setIsChangingRoutine = createRoutine('ROLE:SET_IS_CHANGING');
