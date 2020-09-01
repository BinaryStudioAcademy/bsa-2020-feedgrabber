import { createRoutine } from 'redux-saga-routines';

export const loadQuestionnairesRoutine = createRoutine('QUESTIONNAIRE:LOAD');
export const showModalQuestionnaireRoutine = createRoutine('QUESTIONNAIRE:SHOW_MODAL');
export const hideModalQuestionnaireRoutine = createRoutine('QUESTIONNAIRE:HIDE_MODAL');
export const addQuestionnaireRoutine = createRoutine('QUESTIONNAIRE:ADD');
export const updateQuestionnaireRoutine = createRoutine('QUESTIONNAIRE:UPDATE');
export const deleteQuestionnaireRoutine = createRoutine('QUESTIONNAIRE:DELETE');
export const setQuestionnairePaginationRoutine = createRoutine('QUESTIONNAIRE:SET_PAGINATION');
export const loadOneQuestionnaireRoutine = createRoutine('QUESTIONNAIRE:LOAD_ONE');
export const saveAndGetQuestionnaireRoutine = createRoutine<{title: string}>('QUESTIONNAIRE:LOAD_ONE_AND_GET');
export const setCurrentIdRoutine = createRoutine('QUESTIONNAIRE:SET_CURRENT_ID');