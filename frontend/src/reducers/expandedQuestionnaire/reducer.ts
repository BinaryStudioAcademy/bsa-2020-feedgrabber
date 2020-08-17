import {clearOneQuestionnaireRoutine} from '../../sagas/expandedQuestionnaire/routines';

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
    default:
      return state;
  }
};
