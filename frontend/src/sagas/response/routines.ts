import { createRoutine } from 'redux-saga-routines';

export const addRequestIdToCurrentResponseRoutine = createRoutine('RESPONSE: ADD_REQUEST');
export const getResponseRoutine = createRoutine('RESPONSE:GET');
export const saveResponseRoutine = createRoutine('RESPONSE:CREATE');
