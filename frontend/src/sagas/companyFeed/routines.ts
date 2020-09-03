import { createRoutine } from 'redux-saga-routines';

export const loadCompanyFeedRoutine = createRoutine('COMPANY_FEED:LOAD_FEED');
export const loadCompanyFeedItemRoutine = createRoutine('COMPANY_FEED:LOAD_FEED_ITEM');
export const saveCompanyFeedItemRoutine = createRoutine('COMPANY_FEED:SAVE_ITEM');
