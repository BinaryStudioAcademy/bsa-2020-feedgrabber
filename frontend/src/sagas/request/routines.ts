import {createRoutine} from "redux-saga-routines";

export const sendQuestionnaireRequestRoutine = createRoutine('SEND_REQUEST:SEND');
export const loadRequestedQuestionnairesRoutine = createRoutine('REQUESTED_QUESTIONNAIRES:LOAD');