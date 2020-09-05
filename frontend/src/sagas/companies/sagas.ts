import {all, call, put, takeEvery} from 'redux-saga/effects';
import {fetchCompanyBySubdomainRoutine, fetchCompanyRoutine, loadCompaniesRoutine} from './routines';
import {IGeneric} from "../../models/IGeneric";
import {ICompanyDomain} from "../../models/companies/ICompanyDomain";
import apiClient from "../../helpers/apiClient";

function* fetchCompanies(action) {
    try {
        const res: IGeneric<ICompanyDomain[]> =
            yield call(apiClient.get, `/api/company/user-companies?email=${action.payload}`);

        yield put(loadCompaniesRoutine.success(res.data.data));
        yield put({type: "SET_USER_EMAIL", payload: action.payload});
    } catch (error) {
        yield put(loadCompaniesRoutine.failure(error));
    }
}
function* fetchCompany() {
    try {
        const res: IGeneric<ICompanyDomain> =
            yield call(apiClient.get, `/api/company/user`);

        yield put(fetchCompanyRoutine.success(res.data.data));
    } catch (error) {
        yield put(fetchCompanyRoutine.failure(error));
    }
}
function* fetchCompanyBySubdomain(action) {
    try {
        const res: IGeneric<ICompanyDomain> =
            yield call(apiClient.get, `/api/company/by-subdomain?subdomain=${action.payload}`);

        yield put(fetchCompanyBySubdomainRoutine.success(res.data.data));
    } catch (error) {
        yield put(fetchCompanyBySubdomainRoutine.failure(error.message));
    }
}

export default function* companiesSaga() {
    yield all([
        yield takeEvery(loadCompaniesRoutine.TRIGGER, fetchCompanies),
        yield takeEvery(fetchCompanyRoutine.TRIGGER, fetchCompany),
        yield takeEvery(fetchCompanyBySubdomainRoutine.TRIGGER, fetchCompanyBySubdomain)
    ]);
}
