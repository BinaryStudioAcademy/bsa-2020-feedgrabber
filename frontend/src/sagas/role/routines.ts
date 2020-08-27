import {createRoutine} from "redux-saga-routines";

export const loadShortRolesRoutine = createRoutine('ROLE:GET');
export const toggleModalRoutine = createRoutine('ROLE:TOGGLE_ROLE_CHANGE_MODAL');
export const changeRoleRoutine = createRoutine('ROLE:CHANGE_USER_ROLE');
export const setIsLoadingRoutine = createRoutine('ROLE:SET_IS_LOADING');
export const setIsChangingRoutine = createRoutine('ROLE:SET_IS_CHANGING');
