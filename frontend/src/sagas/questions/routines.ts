import { createRoutine } from 'redux-saga-routines';

export const loadQuestionsRoutine = createRoutine('QUESTION:LOAD_ALL');
export const loadQuestionsExceptRoutine = createRoutine('QUESTION:LOAD_ALL_EXCEPT');
export const saveQuestionRoutine = createRoutine('QUESTION:SAVE_QUESTION');
export const updateQuestionRoutine = createRoutine('QUESTION:UPDATE_QUESTION');
export const loadQuestionnaireQuestionsRoutine = createRoutine('QUESTION:LOAD_QUESTIONNAIRE');
export const loadQuestionsBySectionRoutine = createRoutine('QUESTION:LOAD_SECTION');
export const deleteQuestionRoutine = createRoutine('QUESTION:DELETE');
export const setCurrentQuestionRoutine = createRoutine('QUESTION:SET_CURRENT');
export const setQuestionPaginationRoutine = createRoutine('QUESTION:SET_PAGING');
