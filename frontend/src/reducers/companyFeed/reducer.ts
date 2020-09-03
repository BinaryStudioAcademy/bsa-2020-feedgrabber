import { ICompanyFeedItem } from "../../models/companyFeed/ICompanyFeedItem";
import { IAppState } from "../../models/IAppState";
import {
  loadCompanyFeedRoutine,
  loadCompanyFeedItemRoutine,
  saveCompanyFeedItemRoutine
} from "../../sagas/companyFeed/routines";

export interface ICompanyFeedState {
  list?: ICompanyFeedItem[];
  currentItem?: ICompanyFeedItem;
  isLoading: boolean;
  error?: string;
}

const initialState: ICompanyFeedState = {
  list: null,
  currentItem: null,
  isLoading: false,
  error: null
};

const companyFeedReducer = (state: IAppState['companyFeed'] = initialState, {type, payload}) => {
  switch(type) {
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
        currentItem: payload
      };
    default:
      return state;
  }
};

export default companyFeedReducer;
