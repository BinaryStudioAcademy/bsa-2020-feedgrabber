import {
    loadQuestionsRoutine, loadQuestionByIdRoutine,
    saveQuestionToQuestionnaireRoutine, deleteFromQuestionnaireRoutine,
    addNewQuestionToQuestionnaireRoutine, copyQuestionInQuestionnaireRoutine
} from "sagas/questions/routines";
import { IAppState } from "models/IAppState";
import { IQuestion } from "../../models/forms/Questions/IQuesion";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";
import { ICategoriesState } from "models/categories/ICategorie";
import { loadCategoriesRoutine } from "sagas/categories/routines";

export interface IQuestionsState {
    list?: IQuestion[];
    current?: IQuestion;
    categories?: ICategoriesState;
    isLoading?: boolean;
}

const initialState: IAppState['questions'] = {
    list: [] as IQuestion[],
    categories: {
        list: [] as string[]
    } as ICategoriesState,
    current: defaultQuestion as IQuestion,
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
        case loadCategoriesRoutine.SUCCESS:
            return {
                ...state,
                categories: {
                    list: payload,
                    isLoading: false
                }
            };
        case loadCategoriesRoutine.TRIGGER:
            return {
                ...state,
                categories: {
                    list: state.categories.list,
                    isLoading: true
                }
            };
        case loadCategoriesRoutine.FAILURE:
            return {
                ...state,
                categories: {
                    list: [],
                    isLoading: false
                }
            };
        case saveQuestionToQuestionnaireRoutine.SUCCESS:
        case loadQuestionByIdRoutine.SUCCESS:
            return {
                ...state,
                current: payload,
                list: [...state.list, payload],
                isLoading: false
            };
        case saveQuestionToQuestionnaireRoutine.TRIGGER:
        case loadQuestionsRoutine.TRIGGER:
        case loadQuestionByIdRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case saveQuestionToQuestionnaireRoutine.FAILURE:
        case loadQuestionByIdRoutine.FAILURE:
        case loadQuestionsRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }

};

export default questionsReducer;
