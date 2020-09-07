import { createRoutine } from 'redux-saga-routines';

export const loadQuestionsRoutine = createRoutine('QUESTION:LOAD_ALL');
export const saveQuestionRoutine = createRoutine('QUESTION:SAVE_QUESTION');
export const updateQuestionRoutine = createRoutine('QUESTION:UPDATE_QUESTION');
export const addSelectedQuestionsRoutine = createRoutine('QUESTION:ADD_SELECTED');
export const loadQuestionnaireQuestionsRoutine = createRoutine('QUESTION:LOAD_QUESTIONNAIRE');
export const loadQuestionsBySectionRoutine = createRoutine('QUESTION:LOAD_SECTION');
export const deleteQuestion = createRoutine('QUESTION:DELETE');
