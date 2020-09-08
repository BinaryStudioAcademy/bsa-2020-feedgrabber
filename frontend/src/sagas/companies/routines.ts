import {createRoutine} from "redux-saga-routines";

export const loadCompaniesRoutine = createRoutine('LOAD_COMPANIES:LOAD_ALL');
export const chooseCompanyRoutine = createRoutine('CHOOSE_COMPANY:CHOOSE_ONE');
export const dropCompanyRoutine = createRoutine('DROP_COMPANY:DROP');
export const fetchCompanyRoutine = createRoutine('FETCH_COMPANY:FETCH');
export const setEmailDomainRoutine = createRoutine('COMPANY:SET_EMAIL_DOMAIN');
export const fetchCompanyBySubdomainRoutine = createRoutine('FETCH_COMPANY:FETCH_BY_SUBDOMAIN');
