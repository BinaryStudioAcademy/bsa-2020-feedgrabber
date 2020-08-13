import { loadQuestionsRoutine } from "sagas/questions/routines";
import { IAppState } from "models/IAppState";
import { IQuestion } from "../../models/forms/Questions/IQuesion";
import { loadCategoriesRoutine } from "sagas/categories/routines";
import { ICategoriesState } from "models/categories/ICategorie";

export interface IQuestionsState {
    list?: IQuestion[];
    current?: IQuestion;
    categories?: ICategoriesState;
    isLoading?: boolean;
}

const initialState: IAppState['questions'] = {
    list: [] as IQuestion[],
    current: {} as IQuestion,
    categories: {
        list: [] as string[]
    } as ICategoriesState,
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
        case loadQuestionsRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case loadQuestionsRoutine.FAILURE:
            return {
                ...state,
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
        default:
            return state;
    }
};

export default questionsReducer;
