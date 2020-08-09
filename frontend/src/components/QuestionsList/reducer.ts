import { loadQuestionsRoutine } from './routines';

export interface IQuestion {
  id: string;
  category?: string;
  text: string;
}

export interface IQuestionsListState {
  questions: IQuestion[];
  isLoading: boolean;
  error?: string;
}

export default (state: IQuestionsListState = { questions: null, isLoading: true }, action) => {
  switch (action.type) {
    case loadQuestionsRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case loadQuestionsRoutine.SUCCESS:
      return {
        ...state,
        questions: action.questions,
        isLoading: false
      };
    case loadQuestionsRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.message
      };
    default:
      return state;
  }
};