import {createRoutine} from "redux-saga-routines";

export const setCurrentSectionRoutine = createRoutine("SECTION:SET_CURRENT");
export const getSectionsByQuestionnaireRoutine = createRoutine("SECTION:GET_BY_QUESTIONNAIRE");
export const setCurrentSectionIdRoutine = createRoutine("SECTION:SET_CURRENT");
export const addNewSectionRoutine = createRoutine("SECTION:ADD");
export const createSectionRoutine = createRoutine("SECTION:CREATE");
export const deleteSectionRoutine = createRoutine("SECTION:DELETE");
export const addQuestionToSectionRoutine = createRoutine("SECTION:ADD_QUESTION");
export const deleteQuestionFromSectionRoutine = createRoutine("SECTION:DELETE_QUESTION");
export const updateSectionsRoutine = createRoutine("SECTION:UPDATE");