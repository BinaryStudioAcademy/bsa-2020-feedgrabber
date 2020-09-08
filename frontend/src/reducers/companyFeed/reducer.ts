import { ICompanyFeedItem } from "../../models/companyFeed/ICompanyFeedItem";
import { IAppState } from "../../models/IAppState";
import {
  loadCompanyFeedRoutine,
  loadCompanyFeedItemRoutine,
  saveCompanyFeedItemRoutine,
  createCompanyFeedItemRoutine,
  setCompanyFeedPaginationRoutine
} from "../../sagas/companyFeed/routines";
import {IPaginationInfo} from "../../models/IPaginationInfo";
import {saveCommentRoutine, updateCommentRoutine} from "../../sagas/comments/routines";

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
    case createCompanyFeedItemRoutine.TRIGGER:
    case saveCompanyFeedItemRoutine.TRIGGER:
    case saveCommentRoutine.TRIGGER:
    case updateCommentRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case loadCompanyFeedRoutine.FAILURE:
    case loadCompanyFeedItemRoutine.FAILURE:
    case createCompanyFeedItemRoutine.FAILURE:
    case saveCompanyFeedItemRoutine.FAILURE:
    case saveCommentRoutine.FAILURE:
    case updateCommentRoutine.FAILURE:
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
    case createCompanyFeedItemRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        current: payload
      };
    case saveCommentRoutine.SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          comments: [...state.current.comments, payload]
        },
        isLoading: false
      };
    case updateCommentRoutine.SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          comments: state.current.comments.map(comment => comment.id === payload.id ? payload : comment)
        },
        isLoading: false
      };
    default:
      return state;
  }
};

export default companyFeedReducer;
