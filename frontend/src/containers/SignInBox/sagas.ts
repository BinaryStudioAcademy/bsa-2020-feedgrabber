
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { loginRoutine } from './routines';

import { setIsLoading, setUserAction } from './actions';

import { callApi } from '../../helpers/api.helper'

function* login(action: any) {
  try {
    yield put(setIsLoading(true));
    // ----------
    // to do
    // this part needs to update after mergin whith frontend auth
      const data = yield call(callApi, { type: 'POST', endpoint: 'api/auth/login', requestData: action.authData });
      yield put(setUserAction(data.user));
    // yield call(login(data.token, data.refreshedtoken))
    // -------
  } catch (error) {
    console.log('auth err ', error.message);
  } finally{
    yield put(setIsLoading(false));
  }
}

function* watchLogin() {
  yield takeEvery(loginRoutine.TRIGGER, login)
}

export default function* loginSaga() {
  yield all([
    watchLogin()
  ])
}
