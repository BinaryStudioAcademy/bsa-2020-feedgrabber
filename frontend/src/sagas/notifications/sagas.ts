import {all, call, put, takeEvery} from 'redux-saga/effects';
import {loadNotificationsRoutine,
   deleteNotificationRoutine,
    deleteAllNotificationsRoutine,
     markNotificationAsReadRoutine} from './routines';
import apiClient from "../../helpers/apiClient";
import {INotification} from "../../reducers/notifications";
import {IGeneric} from "../../models/IGeneric";

function* deleteNotification(action) {
  try {
    yield call(apiClient.delete, `/api/user-notifications/delete/${action.payload}`);
    yield put(deleteNotificationRoutine.success());
  } catch (error) {
    yield put(deleteNotificationRoutine.failure(error));
  }
}

function* deleteAll() {
  try {
    yield call(apiClient.delete, `/api/user-notifications/delete/`);
    yield put(deleteAllNotificationsRoutine.success());
  } catch (error) {
    yield put(deleteAllNotificationsRoutine.failure(error));
  }
}

function* loadNotifications() {
  try{
    const res: IGeneric<INotification[]> = yield call(apiClient.get, `/api/user-notifications/all`);
    yield put(loadNotificationsRoutine.success(res.data.data));
  } catch (error) {
    yield put(loadNotificationsRoutine.failure(error));
  }
}

function* readNotification(action) {
  try {
    yield call(apiClient.put, `/api/user-notifications/${action.payload}/read`);
    yield put(loadNotificationsRoutine.trigger());
  } catch (error) {
    console.error(error);
  }
}

export default function* notificationsSagas() {
  yield all([
      takeEvery(loadNotificationsRoutine.TRIGGER, loadNotifications),
      takeEvery(deleteNotificationRoutine.TRIGGER, deleteNotification),
      takeEvery(deleteAllNotificationsRoutine.TRIGGER, deleteAll),
      takeEvery(markNotificationAsReadRoutine.TRIGGER, readNotification)
  ]);
}