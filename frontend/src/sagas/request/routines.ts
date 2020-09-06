import {createRoutine} from "redux-saga-routines";

export const sendQuestionnaireRequestRoutine = createRoutine('SEND_REQUEST:SEND');
export const closeRequestRoutine =
  createRoutine<{ requestId: string; questionnaireId?: string; teamId?: string }>
  ('CLOSE_REQUEST:CLOSE');
export const loadRequestedQuestionnairesRoutine = createRoutine('REQUESTED_QUESTIONNAIRES:LOAD');
