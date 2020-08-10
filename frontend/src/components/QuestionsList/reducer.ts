import { loadQuestionsRoutine } from './routines';

export interface IQuestion {
    id: string;
    category?: string;
    type: 'checkboxes' | 'drop_down' | 'scale' | 'multichoice' | 'free text' | 'radiobutton'; 
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
        questions: action.payload,
        isLoading: false
      };
    case loadQuestionsRoutine.FAILURE:
      return {
        ...state,
        questions: [],
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
