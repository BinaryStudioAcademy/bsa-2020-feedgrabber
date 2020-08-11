import { createRoutine } from 'redux-saga-routines';

export const createQuestionnaireRoutine = createRoutine('QUESTIONNAIRE:CREATE');
export const editQuestionnaireRoutine = createRoutine('QUESTIONNAIRE:EDIT');
export const getQuestionnaireRoutine = createRoutine('QUESTIONNAIRE:GET');
export const getAllQuestionnaireRoutine = createRoutine('QUESTIONNAIRE:GET_ALL');
export const getAllQuestionnaireByCompanyRoutine = createRoutine('QUESTIONNAIRE:GET_ALL_BY_COMPANY');
export const deleteQuestionnaireRoutine = createRoutine('QUESTIONNAIRE:DELETE');
