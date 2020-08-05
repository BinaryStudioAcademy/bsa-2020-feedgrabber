
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { LOGIN } from './actionTypes';

import { setIsLoading, setUserAction } from './actions';

import { callApi } from '../../helpers/api.helper'

function* login(action: any) {
  try {
    yield put(setIsLoading(true));
    
    // to do import login from auth  
    // const user = yield call(login, action.authData)
    const user = yield call(callApi, { type: 'POST', endpoint: 'api/auth/login', requestData: action.authData });
    
    yield put(setUserAction(user.data));
        
  } catch (error) {
    console.log('auth err ', error.message);
  } finally{
    yield put(setIsLoading(false));
  }
}

function* watchLogin() {
  yield takeEvery(LOGIN, login)
}

export default function* loginSaga() {
  yield all([
    watchLogin()
  ])
}
