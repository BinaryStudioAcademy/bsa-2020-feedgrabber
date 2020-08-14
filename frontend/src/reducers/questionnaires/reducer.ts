import {
    addQuestionnaireRoutine,
    deleteQuestionnaireRoutine,
    hideModalQuestionnaireRoutine,
    loadOneQuestionnaireRoutine,
    loadQuestionnairesRoutine, 
    loadQuestionsByQuestionnaireRoutine, 
    setQuestionnairePaginationRoutine,
    showModalQuestionnaireRoutine,
    updateQuestionnaireRoutine
} from '../../sagas/qustionnaires/routines';
import { IAppState } from "../../models/IAppState";
import { combineReducers } from "redux";
import { addSelectedQuestionsRoutine } from "../../sagas/questions/routines";
import { IQuestionnaire } from "../../models/forms/Questionnaires/types";

const questionnairesListReducer = (state: IAppState['questionnaires']['list'] = {}, action) => {
    switch (action.type) {
        case setQuestionnairePaginationRoutine.TRIGGER:
            return {
                ...state,
                pagination: action.payload
            };
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
                pagination: action.payload,
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

const currentQuestionnaireReducer = (state: IAppState['questionnaires']['current'] =
    { questions: [], get: {} as IQuestionnaire }, { payload, type }) => {
    switch (type) {
        case addSelectedQuestionsRoutine.TRIGGER:
            return {
                ...state,
                questions: [...state.questions, ...payload]
            };
        case loadOneQuestionnaireRoutine.SUCCESS:
            return {
                ...state,
                get: payload
            };
        case loadQuestionsByQuestionnaireRoutine.SUCCESS:
            return {
                ...state,
                questions: payload
            };
        case loadOneQuestionnaireRoutine.FAILURE:
            return {
                ...state,
                get: {}
            };
        case loadQuestionsByQuestionnaireRoutine.FAILURE:
            return {
                ...state,
                questions: []
            };
        default:
            return state;
    }
};

const questionnairesReducer = combineReducers({
    list: questionnairesListReducer,
    current: currentQuestionnaireReducer
});

export default questionnairesReducer;
