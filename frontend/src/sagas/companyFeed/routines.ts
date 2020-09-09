import { createRoutine } from 'redux-saga-routines';

export const loadCompanyFeedRoutine = createRoutine('COMPANY_FEED:LOAD_FEED');
export const reactOnNewsRoutine = createRoutine('COMPANY_FEED:REACT_ON_NEWS');
export const applyReactionRoutine = createRoutine('COMPANY_FEED:APPLY_REACTION');
export const setExpandedImageRoutine = createRoutine('COMPANY_FEED:SET_EXPANDED_IMAGE');
export const loadCompanyFeedItemRoutine = createRoutine('COMPANY_FEED:LOAD_FEED_ITEM');
export const saveCompanyFeedItemRoutine = createRoutine('COMPANY_FEED:SAVE_ITEM');
export const createCompanyFeedItemRoutine = createRoutine('COMPANY_FEED:CREATE_ITEM');
export const setCompanyFeedPaginationRoutine = createRoutine("COMPANY_FEED:SET_PAGINATION");
