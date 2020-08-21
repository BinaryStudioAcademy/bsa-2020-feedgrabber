import {
  sendInvitationRoutine
} from "../../sagas/invitation/routines";
import {logoutRoutine} from "../../sagas/auth/routines";

export interface IInvitationState {
  isLoadingGeneration?: boolean;
  errorGeneration?: string;
}

export default (state: IInvitationState = {}, action): IInvitationState => {
  switch (action.type) {
    // case deleteInvitationRoutine.TRIGGER:
    case sendInvitationRoutine.TRIGGER:
    // case loadInvitationRoutine.TRIGGER:
      return {
        ...state,
        isLoadingGeneration: true,
        errorGeneration: undefined
      };
    case sendInvitationRoutine.SUCCESS:
    // case loadInvitationRoutine.SUCCESS:
      return {
        ...state,
        isLoadingGeneration: false
      };
    // case logoutRoutine.TRIGGER:
    //   return {
    //     ...state,
    //     link: undefined,
    //     isLoading: false
    //   };
    // case deleteInvitationRoutine.SUCCESS:
    //   return {
    //     ...state,
    //     link: null,
    //     isLoading: false
    //   };
    // case deleteInvitationRoutine.FAILURE:
    case sendInvitationRoutine.FAILURE:
    // case loadInvitationRoutine.FAILURE:
      return {
        ...state,
        isLoadingGeneration: false,
        errorGeneration: action.payload
      };
    default:
      return state;
  }
};
