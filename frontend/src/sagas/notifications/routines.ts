import {createRoutine} from 'redux-saga-routines';

export const deleteNotificationRoutine = createRoutine('DELETE_NOTIFICATION:DELETE');
export const loadNotificationsRoutine = createRoutine('LOAD_NOTIFICATIONS:LOAD');