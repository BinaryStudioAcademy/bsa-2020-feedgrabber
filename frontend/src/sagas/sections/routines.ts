import {createRoutine} from "redux-saga-routines";

export const setCurrentSection = createRoutine("SECTION:SET_CURRENT");
export const setCurrentQInForm = createRoutine('FORM:SET_CURRENT_QUESTION');

export const loadFormRoutine = createRoutine("FORM:LOAD");

export const addQToFormRoutine = createRoutine("FORM:ADD_QUESTION");
export const deleteQInFormRoutine = createRoutine('FORM:DELETE_QUESTION');
export const updateQInFormRoutine = createRoutine('FORM:UPDATE_QUESTION');

export const addSectionRoutine = createRoutine("SECTION:ADD");
export const deleteSectionRoutine = createRoutine("SECTION:DELETE");
export const updateSectionRoutine = createRoutine("SECTION:UPDATE");

export const updateOrderInFormRoutine = createRoutine("FORM:UPDATE_INDEXES_API");
export const updateOrderInForm = createRoutine("FORM:UPDATE_INDEXES");

export const addExistingQToFormRoutine = createRoutine("SECTION:ADD_EXISTING_QUESTION");

