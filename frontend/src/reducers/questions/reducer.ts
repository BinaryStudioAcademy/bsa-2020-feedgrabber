import {IAppState} from "models/IAppState";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {
    deleteQuestionRoutine, loadQuestionsExceptRoutine,
    loadQuestionsRoutine,
    saveQuestionRoutine, setCurrentQuestionRoutine, setQuestionPaginationRoutine,
    updateQuestionRoutine
} from "../../sagas/questions/routines";
import {IPaginationInfo} from "../../models/IPaginationInfo";

export interface IQuestionsState {
    currentQuestion: IQuestion;
    isLoading?: boolean;
    pagination?: IPaginationInfo<IQuestion>;
}

const initialState: IAppState['questions'] = {
    currentQuestion: {} as IQuestion,
    pagination: {
        total: 0,
        items: [],
        page: 0,
        size: 10
    },
    isLoading: false
};

const questionsReducer = (state: IQuestionsState = initialState, {type, payload}) => {
    switch (type) {
        case loadQuestionsRoutine.TRIGGER:
        case deleteQuestionRoutine.TRIGGER:
        case loadQuestionsExceptRoutine.TRIGGER:
        case saveQuestionRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case setCurrentQuestionRoutine.TRIGGER:
            return {
                ...state,
                currentQuestion: payload
            };
        case setQuestionPaginationRoutine.TRIGGER:
            return {
                ...state,
                pagination: payload
            };
        case loadQuestionsRoutine.SUCCESS:
        case loadQuestionsExceptRoutine.SUCCESS:
            return {
                ...state,
                pagination: payload,
                isLoading: false
            };
        case updateQuestionRoutine.SUCCESS:
            const items = state.pagination.items.map(q => q.id === payload.id ? payload : q);
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    items
                }
            };
        case deleteQuestionRoutine.SUCCESS:
            const itemsDelete = state.pagination.items.filter(q => q.id !== payload);
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    itemsDelete,
                    total: itemsDelete.length
                },
                isLoading: false
            };
        case saveQuestionRoutine.SUCCESS:
            const newItems = [payload, ...state.pagination.items];
            if (newItems.length > state.pagination.size) {
              newItems.pop();
            }
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    items: newItems,
                    total: state.pagination.total + 1
                },
                isLoading: false
            };
        case loadQuestionsRoutine.FAILURE:
        case saveQuestionRoutine.FAILURE:
        case deleteQuestionRoutine.FAILURE:
        case loadQuestionsExceptRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }

};

export default questionsReducer;
