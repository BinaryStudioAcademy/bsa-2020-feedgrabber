import { ICompanyFeedItem } from "../../models/companyFeed/ICompanyFeedItem";
import { IAppState } from "../../models/IAppState";
import {
  loadCompanyFeedRoutine,
  loadCompanyFeedItemRoutine,
  saveCompanyFeedItemRoutine,
  setCompanyFeedPaginationRoutine
} from "../../sagas/companyFeed/routines";
import {IPaginationInfo} from "../../models/IPaginationInfo";

export interface ICompanyFeedState {
  list: IPaginationInfo<ICompanyFeedItem>;
  current: ICompanyFeedItem;
  isLoading: boolean;
  error?: string;
}

const initialState: ICompanyFeedState = {
  list: null,
  current: null,
  isLoading: false,
  error: null
};

const companyFeedReducer = (state: IAppState['companyFeed'] = initialState, {type, payload}) => {
  switch(type) {
    case setCompanyFeedPaginationRoutine.TRIGGER:
      return {
        ...state,
        pagination: payload
      };
    case loadCompanyFeedRoutine.TRIGGER:
    case loadCompanyFeedItemRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case loadCompanyFeedRoutine.FAILURE:
    case loadCompanyFeedItemRoutine.FAILURE:
    case saveCompanyFeedItemRoutine.FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case loadCompanyFeedRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: payload
      };
    case loadCompanyFeedItemRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        current: payload
      };
    default:
      return state;
  }
};

export default companyFeedReducer;
