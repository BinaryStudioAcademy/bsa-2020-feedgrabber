import {IAppState} from "models/IAppState";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {
    deleteQuestion,
    loadQuestionsRoutine,
    saveQuestionRoutine
} from "../../sagas/questions/routines";

export interface IQuestionsState {
    list?: IQuestion[];
    isLoading?: boolean;
}

const initialState: IAppState['questions'] = {
    list: [] as IQuestion[],
    isLoading: false
};

const questionsReducer = (state: IQuestionsState = initialState, {type, payload}) => {
    switch (type) {
        case loadQuestionsRoutine.TRIGGER:
        case deleteQuestion.TRIGGER:
        case saveQuestionRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case loadQuestionsRoutine.SUCCESS:
            return {
                ...state,
                list: payload,
                isLoading: false
            };
        case deleteQuestion.SUCCESS:
            return {
                ...state,
                list: state.list.filter(q => q.id !== payload),
                isLoading: false
            };
        case saveQuestionRoutine.SUCCESS:
            return {
                ...state,
                list: [state.list, payload],
                current: payload,
                isLoading: false
            };
        case loadQuestionsRoutine.FAILURE:
        case saveQuestionRoutine.FAILURE:
        case deleteQuestion.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }

};

export default questionsReducer;
