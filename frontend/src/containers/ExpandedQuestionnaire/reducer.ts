import {clearOneQuestionnaireRoutine, loadOneQuestionnaireRoutine} from './routines';

export interface IQuestionnaireDetails {
  id: string;
  title: string;
  companyName: string;
}

interface IExpandedQuestionnaireState {
  isLoading?: boolean;
  questionnaire?: IQuestionnaireDetails;
}

export default (state: IExpandedQuestionnaireState = {}, action): IExpandedQuestionnaireState => {
  switch (action.type) {
    case clearOneQuestionnaireRoutine.TRIGGER:
      return {
        ...state,
        questionnaire: undefined
      };
    case loadOneQuestionnaireRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case loadOneQuestionnaireRoutine.FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case loadOneQuestionnaireRoutine.SUCCESS:
      return {
        ...state,
        questionnaire: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
