import { createRoutine } from 'redux-saga-routines';

export const loginRoutine = createRoutine('SIGN_IN:LOGIN');
export const registerRoutine = createRoutine('SIGN_UP:REGISTER');
export const logoutRoutine = createRoutine('LOG_OUT:LOGOUT');
