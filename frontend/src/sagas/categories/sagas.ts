import { all, call, put, takeEvery } from 'redux-saga/effects';
import { loadCategoriesRoutine } from './routines';
import apiClient from '../../helpers/apiClient';
import { toastr } from 'react-redux-toastr';
import { ICategorie } from 'models/categories/ICategorie';

function* getAllCategories() {
    try {
        const res: { data: ICategorie[] } = yield call(apiClient.get, `../api/question_categories`);
        // wtf?! drop points before /api and endpoint becomes /question/api/....
        yield put(loadCategoriesRoutine.success(res.data.map(cat => cat.title)));
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
