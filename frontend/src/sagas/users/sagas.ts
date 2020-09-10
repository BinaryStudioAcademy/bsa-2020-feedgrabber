import {all, call, put, select, takeEvery} from "redux-saga/effects";
import apiClient from "../../helpers/apiClient";
import {
  loadCompanyUsersRoutine,
  removeUserFromCompanyRoutine,
  loadFiredUsersRoutine,
  unfireUserRoutine
} from "./routines";
import {toastr} from 'react-redux-toastr';
import {changeRoleRoutine, setIsChangingRoutine, setSelectedUserRoutine} from "../role/routines";

function* loadUserList(action: any) {
  try {
    const query = action.payload;
    const store = yield select();
    const {page, size} = store.users.pagination;
    const api = query 
      ? `/api/user/search/?page=${page}&size=${size}&query=${query}`
      : `/api/user/all/?page=${page}&size=${size}`;
    const res = yield call(apiClient.get, api);
    const items = res.data.data;

    yield put(loadCompanyUsersRoutine.success(items));
  } catch (error) {
    yield put(loadCompanyUsersRoutine.failure(error));
    toastr.error("Cant fetch employee. Try again");
  }
}

function* deleteUserFromCompany(action: any) {
  try {
    const id: string = action.payload;
    yield call(apiClient.put, `/api/user/${id}/removeCompany`);

    yield put(removeUserFromCompanyRoutine.success());
    toastr.success("Employee fired");
    yield put(loadCompanyUsersRoutine.trigger());
    yield put(loadFiredUsersRoutine.trigger());
  } catch (errorResponse) {
    yield put(removeUserFromCompanyRoutine.failure());
    toastr.error(errorResponse.response?.data?.error || 'No response');
    yield put(loadCompanyUsersRoutine.trigger());
  }
}

function* changeUserRole(action) {
  try {
    yield put(setIsChangingRoutine.trigger({isChanging: true}));
    yield call(apiClient.put, `/api/user/role/change`, action.payload);
    yield put(loadCompanyUsersRoutine.trigger());
    yield put(changeRoleRoutine.success());
    yield put(setSelectedUserRoutine.trigger(null));
    toastr.success("Role changed");
  } catch {
    toastr.error("Couldn't load company roles");
    yield put(changeRoleRoutine.failure());
  }
}

function* loadFiredUserList() {
  try {
    const store = yield select();
    const {page, size} = store.users.paginationFired;
    const api = `/api/user/all/?page=${page}&size=${size}&fired=true`;
    const res = yield call(apiClient.get, api);
    const items = res.data.data;
    yield put(loadFiredUsersRoutine.success(items));
  } catch (error) {
    yield put(loadFiredUsersRoutine.failure(error));
    toastr.error("Cant fetch fired employee. Try again");
  }
}

function* unfireUser(action) {
  try {
    // unfire user
    yield call(apiClient.put, `/api/user/${action.payload}/unfire`);
    toastr.success("Employee unfired");
    // reload all users
    yield put(loadCompanyUsersRoutine.trigger());
    yield put(loadFiredUsersRoutine.trigger());
  } catch (error) {
    toastr.error("Unable to unfire employee. Please, try again later");
  }
}

export default function* questionnairesSagas() {
  yield all([
    yield takeEvery(loadCompanyUsersRoutine.TRIGGER, loadUserList),
    yield takeEvery(removeUserFromCompanyRoutine.TRIGGER, deleteUserFromCompany),
    yield takeEvery(changeRoleRoutine.TRIGGER, changeUserRole),
    yield takeEvery(loadFiredUsersRoutine.TRIGGER, loadFiredUserList),
    yield takeEvery(unfireUserRoutine.TRIGGER, unfireUser)
  ]);
}
