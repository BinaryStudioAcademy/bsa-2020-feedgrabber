import {all, call, put, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import apiClient from '../../helpers/apiClient';
import {
  deleteInvitationRoutine,
  loadInvitationsListRoutine,
  resendInvitationRoutine,
  sendInvitationRoutine
} from "./routines";
import {IInvitation} from "../../models/invitation/IInvitation";

function* loadInvitations() {
  try {
    const res = yield call(apiClient.get, `/api/invitations`);
    const list: IInvitation[] = res.data.data;

    yield put(loadInvitationsListRoutine.success(list));
  } catch (error) {
    yield put(loadInvitationsListRoutine.failure());
    toastr.error("Unable to load invitations");
  }
}

function* generateInvitation(action: any) {
  try {
    const email: string = action.payload;
    yield call(apiClient.post, `/api/invitations`, {email});

    yield put(sendInvitationRoutine.success());
    yield put(loadInvitationsListRoutine.trigger());
    toastr.success("New link generated");
  } catch (error) {
    yield put(sendInvitationRoutine.failure(error.data?.error || 'No response'));
    toastr.error("Unable to generate link");
  }
}

function* deleteInvitation(action: any) {
  const email: string = action.payload;
  try {
    yield call(apiClient.delete, `/api/invitations?email=${email}`);

    yield put(deleteInvitationRoutine.success(email));
    yield put(loadInvitationsListRoutine.trigger());
    toastr.success("Invitation link deleted");
  } catch (error) {
    yield put(deleteInvitationRoutine.failure(email));
    toastr.error("Unable to delete link");
  }
}

function* resendInvitation(action: any) {
  const email: string = action.payload;
  try {
    yield call(apiClient.post, `/api/invitations/resend`, {email});

    yield put(resendInvitationRoutine.success(email));
    yield put(loadInvitationsListRoutine.trigger());
    toastr.success("The new link was send");
  } catch (error) {
    yield put(resendInvitationRoutine.failure(email));
    toastr.error("Unable to generate link");
  }
}

export default function* invitationSagas() {
  yield all([
    yield takeEvery(loadInvitationsListRoutine.TRIGGER, loadInvitations),
    yield takeEvery(sendInvitationRoutine.TRIGGER, generateInvitation),
    yield takeEvery(resendInvitationRoutine.TRIGGER, resendInvitation),
    yield takeEvery(deleteInvitationRoutine.TRIGGER, deleteInvitation)
  ]);
}
