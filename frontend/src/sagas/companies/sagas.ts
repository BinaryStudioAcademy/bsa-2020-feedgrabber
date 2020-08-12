import {all, call, put, takeEvery} from 'redux-saga/effects';
import {loadCompaniesRoutine} from './routines';
import {IGeneric} from "../../models/IGeneric";
import {ICompanyDomain} from "../../models/companies/ICompanyDomain";
import apiClient from "../../helpers/apiClient";

function* fetchCompanies(action) {
    try {
        const res: IGeneric<ICompanyDomain[]> =
            yield call(apiClient.get, `/api/company/user-companies?email=${action.payload}`);

        yield put(loadCompaniesRoutine.success(res.data.data));
    } catch (error) {
        console.log(error);
        yield put(loadCompaniesRoutine.failure(error));
    }
}

export default function* companiesSaga() {
    yield all([
        yield takeEvery(loadCompaniesRoutine.TRIGGER, fetchCompanies)
    ]);
}