import {
  addQuestionnaireRoutine,
  hideModalQuestionnaireRoutine,
  loadQuestionnairesRoutine,
  showModalQuestionnaireRoutine, updateQuestionnaireRoutine
} from './routines';

export interface IQuestionnaire {
  id: string;
  title: string;
  companyName: string;
}

export interface ICreateQuestionnaire {
  title: string;
  companyId: string;
}

export interface IUpdateQuestionnaire {
  id: string;
  title: string;
  companyId: string;
}

interface IQuestionnairesListState {
  isLoading?: boolean;
  items?: IQuestionnaire[];
  modalShown?: boolean;
  modalQuestionnaire?: IQuestionnaire;
  modalLoading?: boolean;
  modalError?: string;
}

export default (state: IQuestionnairesListState = {}, action) => {
  switch (action.type) {
    case loadQuestionnairesRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case loadQuestionnairesRoutine.FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case loadQuestionnairesRoutine.SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false
      };
    case addQuestionnaireRoutine.TRIGGER:
    case updateQuestionnaireRoutine.TRIGGER:
      return {
        ...state,
        modalError: undefined,
        modalLoading: true
      };
    case updateQuestionnaireRoutine.FAILURE:
    case addQuestionnaireRoutine.FAILURE:
      return {
        ...state,
        modalError: action.payload,
        modalLoading: false
      };
    case showModalQuestionnaireRoutine.TRIGGER:
      return {
        ...state,
        modalShown: true,
        modalQuestionnaire: action.payload
      };
    case hideModalQuestionnaireRoutine.TRIGGER:
      return {
        ...state,
        modalError: undefined,
        modalShown: false,
        modalQuestionnaire: undefined,
        modalLoading: false
      };
    default:
      return state;
  }
};
