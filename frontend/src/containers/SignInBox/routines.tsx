import { createRoutine } from 'redux-saga-routines';

export const loginRoutine = createRoutine('SIGN_IN:LOGIN');
export const setLoadingRoutine = createRoutine('SIGN_IN:SET_IS_LOADING');

