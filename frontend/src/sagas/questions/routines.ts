import { createRoutine } from 'redux-saga-routines';

export const loadQuestionsRoutine = createRoutine('QUESTION:LOAD_ALL');
export const addNewQuestionToQuestionnaireRoutine = createRoutine('QUESTION:ADD_NEW_TO_QUESTIONNAIRE');
export const copyQuestionInQuestionnaireRoutine = createRoutine('QUESTION: COPY_QUESTION');
export const saveQuestionToQuestionnaireRoutine = createRoutine('QUESTION:SAVE_TO_QUESTIONNAIRE');
export const addSelectedQuestionsRoutine = createRoutine('QUESTION:ADD_SELECTED');
export const loadQuestionByIdRoutine = createRoutine('QUESTION:LOAD_ONE');
export const loadQuestionnaireQuestionsRoutine = createRoutine('QUESTION:LOAD_QUESTIONNAIRE');
export const indexQuestionsRoutine = createRoutine('QUESTION:INDEX_QUESTIONS');
export const deleteFromQuestionnaireRoutine = createRoutine('QUESTION:DELETE_QUESTION_FROM_QUESTIONNAIRE');
export const loadQuestionsBySectionRoutine = createRoutine('QUESTION:LOAD_SECTION');
