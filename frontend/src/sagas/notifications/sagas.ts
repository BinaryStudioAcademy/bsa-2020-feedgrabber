import {all, call, put, takeEvery} from 'redux-saga/effects';
import {loadNotificationsRoutine, deleteNotificationRoutine} from './routines';
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

function* loadNotifications(action) {
  try{
    const res: IGeneric<INotification[]> = yield call(apiClient.get, '/api/user-notifications/all');
    yield put(loadNotificationsRoutine.success(res.data.data));
  } catch (error) {
    yield put(loadNotificationsRoutine.failure(error));
  }
}

export default function* notificationsSagas() {
  yield all([
      takeEvery(loadNotificationsRoutine.TRIGGER, loadNotifications),
      takeEvery(deleteNotificationRoutine.TRIGGER, deleteNotification)
  ]);
}