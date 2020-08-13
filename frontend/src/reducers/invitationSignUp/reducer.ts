import {loadInvitationSingUpRoutine} from "../../sagas/invitationSignUp/routines";

export interface IInvitationSignUpData {
  companyName: string;
}

export interface IInvitationSignUpState {
  isLoading?: boolean;
  data?: IInvitationSignUpData;
  error?: boolean;
}

export default (state: IInvitationSignUpState = {}, action): IInvitationSignUpState => {
  switch (action.type) {
    case loadInvitationSingUpRoutine.TRIGGER:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case loadInvitationSingUpRoutine.SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case loadInvitationSingUpRoutine.FAILURE:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};
