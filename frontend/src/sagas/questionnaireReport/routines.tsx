import { createRoutine } from 'redux-saga-routines';

export const clearQuestionnaireReportRoutine = createRoutine('QUESTIONNAIRE_REPORT:CLEAR');
export const loadQuestionnaireRequestsRoutine = createRoutine('QUESTIONNAIRE_REPORT:LOAD_REPORTS');
export const loadReportRoutine = createRoutine('QUESTIONNAIRE_REPORT:LOAD_REPORT');
