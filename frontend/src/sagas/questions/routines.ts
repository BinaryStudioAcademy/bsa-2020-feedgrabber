import { createRoutine } from 'redux-saga-routines';

export const loadQuestionsRoutine = createRoutine('QUESTION:LOAD_ALL');
export const saveQuestionRoutine = createRoutine('QUESTION:SAVE');
export const addSelectedQuestionsRoutine = createRoutine('QUESTION:ADD_SELECTED');
export const loadQuestionnaireQuestionsRoutine = createRoutine('QUESTION:LOAD_QUESTIONNAIRE');
export const loadQuestionByIdRoutine = createRoutine('QUESTION:LOAD_ONE');