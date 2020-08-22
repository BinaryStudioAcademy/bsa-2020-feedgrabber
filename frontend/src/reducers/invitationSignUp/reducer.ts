import {loadInvitationSingUpRoutine, registerInvitationSingUpRoutine} from "../../sagas/invitationSignUp/routines";

export interface IInvitationSignUpData {
  email: string;
  createdAt: string;
  companyName: string;
  accepted: boolean;
}

export interface IRegisterInvitationSignUpData {
  password: string;
  username: string;
  invitationId: string;
}

export interface IInvitationSignUpState {
  isLoading?: boolean;
  data?: IInvitationSignUpData;
  loadFailed?: boolean;
  error?: string;
  registerLoading?: boolean;
}

export default (state: IInvitationSignUpState = {}, action): IInvitationSignUpState => {
  switch (action.type) {
    case loadInvitationSingUpRoutine.TRIGGER:
      return {
        ...state,
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
        loadFailed: true,
        isLoading: false
      };

    case registerInvitationSingUpRoutine.TRIGGER:
      return {
        ...state,
        registerLoading: true
      };
    case registerInvitationSingUpRoutine.SUCCESS:
      return {
        ...state,
        registerLoading: false
      };
    case registerInvitationSingUpRoutine.FAILURE:
      return {
        ...state,
        registerLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
