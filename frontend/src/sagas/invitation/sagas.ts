import {all, call, put, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import apiClient from '../../helpers/apiClient';
import {deleteInvitationRoutine, generateInvitationRoutine, loadInvitationRoutine} from "./routines";

function* loadInvitation() {
  try {
    const res = yield call(apiClient.get, `http://localhost:5000/api/invitations`);
    const id = res.data.data;

    yield put(loadInvitationRoutine.success(id));
  } catch (error) {
    yield put(loadInvitationRoutine.failure());
    toastr.error("Unable to load link");
  }
}

function* generateInvitation() {
  try {
    const res = yield call(apiClient.post, `http://localhost:5000/api/invitations`);
    const id = res.data.data;

    yield put(generateInvitationRoutine.success(id));
    toastr.success("New link generated");
  } catch (error) {
    yield put(generateInvitationRoutine.failure());
    toastr.error("Unable to generate link");
  }
}

function* deleteInvitation() {
  try {
    yield call(apiClient.delete, `http://localhost:5000/api/invitations`);

    yield put(deleteInvitationRoutine.success());
    toastr.success("Invitation link deleted");
  } catch (error) {
    yield put(deleteInvitationRoutine.failure());
    toastr.error("Unable to delete link");
  }
}

export default function* invitationSagas() {
  yield all([
    yield takeEvery(loadInvitationRoutine.TRIGGER, loadInvitation),
    yield takeEvery(generateInvitationRoutine.TRIGGER, generateInvitation),
    yield takeEvery(deleteInvitationRoutine.TRIGGER, deleteInvitation)
  ]);
}
