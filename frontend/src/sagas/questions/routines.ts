import { createRoutine } from 'redux-saga-routines';

export const loadQuestionsRoutine = createRoutine('QUESTION:LOAD_ALL');
export const saveQuestionToQuestionnaireRoutine = createRoutine('QUESTION:SAVE');
export const addSelectedQuestionsRoutine = createRoutine('QUESTION:ADD_SELECTED');
export const loadQuestionByIdRoutine = createRoutine('QUESTION:LOAD_ONE');
export const loadQuestionnaireQuestionsRoutine = createRoutine('QUESTION:LOAD_QUESTIONNAIRE');
export const addNewQuestionToQuestionnaireRoutine = createRoutine('QUESTION:ADD_NEW_TO_QUESTIONNAIRE');
export const indexQuestionsRoutine = createRoutine('QUESTION:INDEX_QUESTIONS');