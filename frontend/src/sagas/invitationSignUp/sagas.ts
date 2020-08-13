import {all, call, put, takeEvery} from 'redux-saga/effects';
import apiClient from '../../helpers/apiClient';
import {loadInvitationSingUpRoutine, registerInvitationSingUpRoutine} from "./routines";
import {IInvitationSignUpData} from "../../reducers/invitationSignUp/reducer";
import {saveTokens} from '../../security/authProvider';
import {loginRoutine} from "../auth/routines";
import {history} from "../../helpers/history.helper";

function* loadInvitationSignUp(action: any) {
  try {
    const res = yield call(apiClient.get, `http://localhost:5000/api/invitations/sign-up/${action.payload}`);
    const invitationData: IInvitationSignUpData = res.data.data;

    yield put(loadInvitationSingUpRoutine.success(invitationData));
  } catch (error) {
    yield put(loadInvitationSingUpRoutine.failure());
  }
}

function* registerInvitationSignUp(action: any) {
  try {
    const res = yield call(apiClient.post, `http://localhost:5000/api/auth/invitation`, action.payload);

    const {user, refreshToken, accessToken} = res.data.data;

    yield put(loginRoutine.success(user));
    yield call(saveTokens, {accessToken, refreshToken});
    yield call(history.push, "/");
  } catch (e) {
    yield put(registerInvitationSingUpRoutine.failure(e.response?.data?.error || 'No response'));
  }
}

export default function* invitationSignUpSagas() {
  yield all([
    yield takeEvery(loadInvitationSingUpRoutine.TRIGGER, loadInvitationSignUp),
    yield takeEvery(registerInvitationSingUpRoutine.TRIGGER, registerInvitationSignUp)
  ]);
}
