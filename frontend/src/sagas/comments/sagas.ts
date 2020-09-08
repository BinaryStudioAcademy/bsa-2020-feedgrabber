import apiClient from "../../helpers/apiClient";
import { put, call, all, takeEvery } from "redux-saga/effects";
import {deleteCommentRoutine, saveCommentRoutine, updateCommentRoutine} from "./routines";

function* saveComment(action) {
    try {
        const comment = action.payload;
        const res = yield call(apiClient.post, '/api/comments', comment);
        yield put(saveCommentRoutine.success(res.data.data));
    } catch (error) {
        yield put(saveCommentRoutine.failure(error));
    }
}

function* updateComment(action) {
    try {
        const comment = action.payload;
        const res = yield call(apiClient.put, '/api/comments', comment);
        yield put(updateCommentRoutine.success(res.data.data));
    } catch (error) {
        yield put(updateCommentRoutine.failure(error));
    }
}

function* deleteComment(action) {
    try {
        const id = action.payload;
        yield call(apiClient.delete, `/api/comments/${id}`);
        yield put(deleteCommentRoutine.success(id));
    } catch (error) {
        yield put(deleteCommentRoutine.failure(error));
    }
}

export default function* commentsSagas() {
    yield all([
        yield takeEvery(saveCommentRoutine.TRIGGER, saveComment),
        yield takeEvery(updateCommentRoutine.TRIGGER, updateComment),
        yield takeEvery(deleteCommentRoutine.TRIGGER, deleteComment)
    ]);
}
