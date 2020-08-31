import { all, call, put, takeEvery } from 'redux-saga/effects';
import { loadCategoriesRoutine } from './routines';
import apiClient from '../../helpers/apiClient';
import { ICategorie } from 'models/categories/ICategorie';
import {defaultQuestionValues} from "../../components/QuestionDetails/defaultValues";

function* getAllCategories() {
    try {
        const res: { data: ICategorie[] } = yield call(apiClient.get, `/api/question_categories`);
        const payload: string[] = res.data.map(cat => cat.title);
        if(payload.indexOf(defaultQuestionValues.categoryTitle) === -1) {
            payload.push(defaultQuestionValues.categoryTitle);
        }
        yield put(loadCategoriesRoutine.success(payload));
    } catch (e) {
        yield put(loadCategoriesRoutine.failure());
       // toastr.error(e);
    }
}

export default function* categorieSagas() {
    yield all([
        yield takeEvery(loadCategoriesRoutine.TRIGGER, getAllCategories)
    ]);
}
