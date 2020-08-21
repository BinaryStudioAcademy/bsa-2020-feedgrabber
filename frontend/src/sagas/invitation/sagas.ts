import {all, call, put, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import apiClient from '../../helpers/apiClient';
import {loadInvitationsListRoutine, sendInvitationRoutine} from "./routines";
import {IInvitation} from "../../models/invitation/IInvitation";

function* loadInvitations() {
  try {
    const res = yield call(apiClient.get, `http://localhost:5000/api/invitations`);
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
//
// function* deleteInvitation() {
//   try {
//     yield call(apiClient.delete, `http://localhost:5000/api/invitations`);
//
//     yield put(deleteInvitationRoutine.success());
//     toastr.success("Invitation link deleted");
//   } catch (error) {
//     yield put(deleteInvitationRoutine.failure());
//     toastr.error("Unable to delete link");
//   }
// }

export default function* invitationSagas() {
  yield all([
    yield takeEvery(loadInvitationsListRoutine.TRIGGER, loadInvitations),
    yield takeEvery(sendInvitationRoutine.TRIGGER, generateInvitation)
    // yield takeEvery(deleteInvitationRoutine.TRIGGER, deleteInvitation)
  ]);
}
