import {
  deleteInvitationRoutine,
  loadInvitationsListRoutine, resendInvitationRoutine,
  sendInvitationRoutine
} from "../../sagas/invitation/routines";
import {logoutRoutine} from "../../sagas/auth/routines";
import {IInvitation} from "../../models/invitation/IInvitation";

export interface IInvitationState {
  isLoadingGeneration?: boolean;
  errorGeneration?: string;
  list?: IInvitation[];
  isLoadingList?: boolean;
  errorLoadingList?: boolean;
}

export default (state: IInvitationState = {}, action): IInvitationState => {
  switch (action.type) {
    case loadInvitationsListRoutine.TRIGGER:
      return {
        ...state,
        isLoadingList: true,
        errorLoadingList: undefined
      };
    case loadInvitationsListRoutine.SUCCESS:
      return {
        ...state,
        isLoadingList: false,
        list: action.payload
      };
    case loadInvitationsListRoutine.FAILURE:
      return {
        ...state,
        isLoadingList: false,
        errorLoadingList: true
      };

    case sendInvitationRoutine.TRIGGER:
      return {
        ...state,
        isLoadingGeneration: true,
        errorGeneration: undefined
      };
    case sendInvitationRoutine.SUCCESS:
      return {
        ...state,
        isLoadingGeneration: false
      };
    case sendInvitationRoutine.FAILURE:
      return {
        ...state,
        isLoadingGeneration: false,
        errorGeneration: action.payload
      };

    case deleteInvitationRoutine.TRIGGER:
      return {
        ...state,
        list: (state.list || []).map(i => i.email === action.payload ? {...i, isDeleting: true} : i)
      };
    case deleteInvitationRoutine.SUCCESS:
    case deleteInvitationRoutine.FAILURE:
      return {
        ...state,
        list: (state.list || []).map(i => i.email === action.payload ? {...i, isDeleting: false} : i)
      };

    case resendInvitationRoutine.TRIGGER:
      return {
        ...state,
        list: (state.list || []).map(i => i.email === action.payload ? {...i, isResending: true} : i)
      };
    case resendInvitationRoutine.SUCCESS:
    case resendInvitationRoutine.FAILURE:
      return {
        ...state,
        list: (state.list || []).map(i => i.email === action.payload ? {...i, isResending: false} : i)
      };

    case logoutRoutine.TRIGGER:
      return {
        ...state,
        list: undefined
      };

    default:
      return state;
  }
};
