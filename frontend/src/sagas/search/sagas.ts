import {all, call, put, takeEvery} from "redux-saga/effects";
import apiClient from "../../helpers/apiClient";
import {toastr} from 'react-redux-toastr';
import {searchOverAllEntities, updateSearchQuery} from "./routines";
import {IGeneric} from "../../models/IGeneric";
import {ISearchResult} from "../../models/search/Search";

function* searchOverAll(action) {
    try {
        yield put(updateSearchQuery.success(action.payload));

      if (!action.payload) {
        yield put(searchOverAllEntities.failure());
        return;
      }
        const res: IGeneric<ISearchResult> = yield call(apiClient.get, `/api/search?query=${action.payload}`);

        yield put(searchOverAllEntities.success(res.data.data));
    } catch (error) {
        yield put(searchOverAllEntities.failure(error));
        toastr.error("Unable to fetch data");
    }
}

export default function* searchSagas() {
    yield all([
        yield takeEvery(searchOverAllEntities.TRIGGER, searchOverAll)
    ]);
}
