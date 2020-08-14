import {createRoutine} from "redux-saga-routines";

export const loadCompaniesRoutine = createRoutine('LOAD_COMPANIES:LOAD_ALL');
export const chooseCompanyRoutine = createRoutine('CHOOSE_COMPANY:CHOOSE_ONE');
export const dropCompanyRoutine = createRoutine('DROP_COMPANY:DROP');
export const fetchCompanyRoutine = createRoutine('FETCH_COMPANY:FETCH');