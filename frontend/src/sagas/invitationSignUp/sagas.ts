import {all, call, put, takeEvery} from 'redux-saga/effects';
import apiClient from '../../helpers/apiClient';
import {loadInvitationSingUpRoutine} from "./routines";
import {IInvitationSignUpData} from "../../reducers/invitationSignUp/reducer";

function* loadInvitationSignUp(action: any) {
  try {
    const res = yield call(apiClient.get, `http://localhost:5000/api/invitations/sign-up/${action.payload}`);
    const invitationData: IInvitationSignUpData = res.data.data;

    yield put(loadInvitationSingUpRoutine.success(invitationData));
  } catch (error) {
    yield put(loadInvitationSingUpRoutine.failure());
  }
}

export default function* invitationSignUpSagas() {
  yield all([
    yield takeEvery(loadInvitationSingUpRoutine.TRIGGER, loadInvitationSignUp)
  ]);
}
