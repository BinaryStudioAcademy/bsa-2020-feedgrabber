import apiClient from "../../helpers/apiClient";
import { put, call, all, takeEvery } from "redux-saga/effects";
import {saveCommentRoutine} from "./routines";

function* saveComment(action) {
    try {
        const comment = action.payload;
        const res = yield call(apiClient.post, '/api/comments', comment);
        yield put(saveCommentRoutine.success(res.data.data));
    } catch (error) {
        yield put(saveCommentRoutine.failure(error));
    }
}

export default function* commentsSagas() {
    yield all([
        yield takeEvery(saveCommentRoutine.TRIGGER, saveComment)
    ]);
}
