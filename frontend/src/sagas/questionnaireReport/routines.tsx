import { createRoutine } from 'redux-saga-routines';

export const loadQuestionnaireRequestsRoutine = createRoutine('QUESTIONNAIRE_REPORT:LOAD_REPORTS');
export const loadReportRoutine = createRoutine('QUESTIONNAIRE_REPORT:LOAD_REPORT');
export const clearQuestionnaireReportRoutine = createRoutine('QUESTIONNAIRE_REPORT:CLEAR');
export const loadQuestionnaireReportRoutine = createRoutine('QUESTIONNAIRE_REPORT:LOAD');
export const loadRespondentReportRoutine = createRoutine('RESPONDENT_REPORTS:LOAD');
