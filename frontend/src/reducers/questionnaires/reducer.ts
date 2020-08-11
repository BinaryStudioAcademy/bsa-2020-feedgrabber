import {
  addQuestionnaireRoutine, deleteQuestionnaireRoutine,
  hideModalQuestionnaireRoutine,
  loadQuestionnairesRoutine,
  showModalQuestionnaireRoutine, updateQuestionnaireRoutine
} from '../../containers/QuestionnaireList/routines';
import {IAppState} from "../../models/IAppState";

const questionnairesReducer = (state: IAppState['questionnaires'] = {}, action) => {
  switch (action.type) {
    case loadQuestionnairesRoutine.TRIGGER:
    case deleteQuestionnaireRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case loadQuestionnairesRoutine.FAILURE:
    case deleteQuestionnaireRoutine.SUCCESS:
    case deleteQuestionnaireRoutine.FAILURE:
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

export default questionnairesReducer;
