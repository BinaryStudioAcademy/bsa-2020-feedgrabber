// import {
//   deleteInvitationRoutine,
//   generateInvitationRoutine,
//   loadInvitationRoutine
// } from "../../sagas/invitation/routines";
import {logoutRoutine} from "../../sagas/auth/routines";

export interface IInvitationState {
  isLoading?: boolean;
  link?: string | null;
}

export default (state: IInvitationState = {}, action): IInvitationState => {
  switch (action.type) {
    // case deleteInvitationRoutine.TRIGGER:
    // case generateInvitationRoutine.TRIGGER:
    // case loadInvitationRoutine.TRIGGER:
    //   return {
    //     ...state,
    //     isLoading: true
    //   };
    // case generateInvitationRoutine.SUCCESS:
    // case loadInvitationRoutine.SUCCESS:
    //   return {
    //     ...state,
    //     link: action.payload,
    //     isLoading: false
    //   };
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
    // case generateInvitationRoutine.FAILURE:
    // case loadInvitationRoutine.FAILURE:
    //   return {
    //     ...state,
    //     isLoading: false
    //   };
    default:
      return state;
  }
};
