import { select, call, put, takeEvery } from "redux-saga/effects";
import apiClient from "helpers/apiClient";
import {toastr} from 'react-redux-toastr';
import { loadNewsListRoutine } from "./routines";

function* loadNewsList() {
    try {
        const store = yield select();
        const {page, size} = store.news.list.pagination;
        const res = yield call(apiClient.get, `/api/news?page=${page}&size=${size}`);
        const items = res.data.data;

        yield put(loadNewsListRoutine.success(items));
    } catch (error) {
        yield put(loadNewsListRoutine.failure(error));
        toastr.error("Unable to load news");
    }
}

export default function* newsSagas() {
    yield takeEvery(loadNewsListRoutine.TRIGGER, loadNewsList);
}