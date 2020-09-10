import { select, call, put, takeEvery, all } from "redux-saga/effects";
import apiClient from "helpers/apiClient";
import {toastr} from 'react-redux-toastr';
import {loadNewsByIdRoutine, loadNewsListRoutine} from "./routines";

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

function* loadNewsById(action) {
    try {
        const { id } = action.payload;
        const res = yield call(apiClient.get, `/api/news/${id}`);
        const news = res.data.data;

        yield put(loadNewsByIdRoutine.success(news));
    } catch (error) {
        yield put(loadNewsByIdRoutine.failure(error));
    }
}

export default function* newsSagas() {
    yield all([
        yield takeEvery(loadNewsListRoutine.TRIGGER, loadNewsList),
        yield takeEvery(loadNewsByIdRoutine.TRIGGER, loadNewsById)
    ]);
}
