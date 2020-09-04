import {
    loadQuestionsRoutine,
    loadQuestionByIdRoutine,
    saveQuestionRoutine, deleteFromQuestionnaireRoutine
} from "sagas/questions/routines";
import { IAppState } from "models/IAppState";
import { IQuestion } from "../../models/forms/Questions/IQuesion";
import { loadCategoriesRoutine } from "sagas/categories/routines";

export interface IQuestionsState {
    list?: IQuestion[];
    current?: IQuestion;
    isLoading?: boolean;
}

const initialState: IAppState['questions'] = {
    list: [] as IQuestion[],
    current: {} as IQuestion,
    isLoading: false
};

const questionsReducer = (state: IQuestionsState = initialState, { type, payload }) => {
    switch (type) {
        case loadQuestionsRoutine.SUCCESS:
            return {
                ...state,
                list: payload,
                isLoading: false
            };
        case deleteFromQuestionnaireRoutine.TRIGGER:
            if (state.current.id === payload) return {...state, current: {}};
            else return state;
        case loadQuestionByIdRoutine.SUCCESS:
        case saveQuestionRoutine.SUCCESS:
            return {
                ...state,
                current: payload,
                list: [...state.list, payload],
                isLoading: false
            };
        case loadQuestionsRoutine.TRIGGER:
        case loadQuestionByIdRoutine.TRIGGER:
        case saveQuestionRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case loadQuestionByIdRoutine.FAILURE:
        case loadQuestionsRoutine.FAILURE:
        case saveQuestionRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }

};

export default questionsReducer;
