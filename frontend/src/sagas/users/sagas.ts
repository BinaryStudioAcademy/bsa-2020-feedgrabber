import {all, call, put, select, takeEvery} from "redux-saga/effects";
import apiClient from "../../helpers/apiClient";
import {
  loadCompanyUsersRoutine,
  removeUserFromCompanyRoutine,
  loadSearchUserSuggestionsRoutine, searchUsersRoutine
} from "./routines";
import {toastr} from 'react-redux-toastr';

function* loadUserList(action: any) {
  try {
    const query = action.payload;
    const store = yield select();
    const {page, size} = store.users.pagination;
    const api = query 
      ? `api/user/search/?page=${page}&size=${size}&query=${query}` 
      : `api/user/all/?page=${page}&size=${size}`;
    const res = yield call(apiClient.get, api);
    const items = res.data.data;

    yield put(loadCompanyUsersRoutine.success(items));
  } catch (error) {
    yield put(loadCompanyUsersRoutine.failure(error));
    toastr.error("Cant fetch employe. Try again");
  }
}

function* deleteUserFromCompany(action: any) {
  try {
    const id: string = action.payload;
    yield call(apiClient.put, `api/user/${id}/removeCompany`);

    yield put(removeUserFromCompanyRoutine.success());
    toastr.success("Employee fired");
    yield put(loadCompanyUsersRoutine.trigger());
  } catch (errorResponse) {
    yield put(removeUserFromCompanyRoutine.failure());
    toastr.error(errorResponse.response?.data?.error || 'No response');
    yield put(loadCompanyUsersRoutine.trigger());
  }
}

function* searchByName(action: any) {
  try {
    const store = yield select();
    const {page, size} = store.users.searchPagination;
    const { searchQuery } = action.payload;
    const res = yield call(apiClient.get, `api/user/search/?page=${page}&size=${size}?query=${searchQuery}`);
    const items = res.data.data;
    yield put(searchUsersRoutine.success(items));
  } catch (error) {
    yield put(loadSearchUserSuggestionsRoutine.failure());
    toastr.error(error.response?.data?.error || 'No response');
  }
}

export default function* questionnairesSagas() {
  yield all([
    yield takeEvery(loadCompanyUsersRoutine.TRIGGER, loadUserList),
    yield takeEvery(removeUserFromCompanyRoutine.TRIGGER, deleteUserFromCompany),
    yield takeEvery(searchUsersRoutine, searchByName)
  ]);
}
