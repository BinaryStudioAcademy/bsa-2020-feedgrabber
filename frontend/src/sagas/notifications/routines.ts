import {createRoutine} from 'redux-saga-routines';

export const loadNotificationsRoutine = createRoutine('LOAD_NOTIFICATIONS:LOAD');
export const deleteNotificationRoutine = createRoutine('DELETE_NOTIFICATION:DELETE');
export const deleteAllNotificationsRoutine = createRoutine('DELETE_NOTIFICATION_ALL:DELETE');
export const receiveNotificationRoutine = createRoutine('RECEIVE_NOTIFICATION_ROUTINE:RECEIVE');
export const markNotificationAsReadRoutine = createRoutine('NOTIFICATION:READ');
