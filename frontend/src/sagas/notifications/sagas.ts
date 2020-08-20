import {all, call, put, takeEvery} from 'redux-saga/effects';
import {loadNotificationsRoutine, deleteNotificationRoutine} from './routines';

function* deleteNotification(action) {
  // some request to api
  yield put(deleteNotificationRoutine.success());
}

function* loadNotifications(action) {
  // some request to api
  yield put(loadNotificationsRoutine.success());
}

export default function* notificationsSagas() {
  yield all([
      takeEvery(loadNotificationsRoutine.TRIGGER, loadNotifications),
      takeEvery(deleteNotificationRoutine.TRIGGER, deleteNotification)
  ]);
}