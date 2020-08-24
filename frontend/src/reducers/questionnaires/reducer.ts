import {
    addQuestionnaireRoutine,
    deleteQuestionnaireRoutine,
    hideModalQuestionnaireRoutine,
    loadOneQuestionnaireRoutine,
    loadQuestionnairesRoutine,
    setQuestionnairePaginationRoutine,
    showModalQuestionnaireRoutine,
    updateQuestionnaireRoutine
} from '../../sagas/qustionnaires/routines';
import { IAppState } from "../../models/IAppState";
import { combineReducers } from "redux";
import {
    addNewQuestionToQuestionnaireRoutine,
    addSelectedQuestionsRoutine, copyQuestionInQuestionnaireRoutine, deleteFromQuestionnaireRoutine,
    loadQuestionnaireQuestionsRoutine
} from "../../sagas/questions/routines";
import { IQuestionnaire, IRequest } from "../../models/forms/Questionnaires/types";
import { loadRequestedQuestionnairesRoutine } from 'sagas/request/routines';

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

const pendingQuestionnairesReducer = (state: IAppState['questionnaires']['pending'] =
    { list: [] as IRequest[], isLoading: false }, { payload, type }) => {
    switch (type) {
        case loadRequestedQuestionnairesRoutine.SUCCESS:
            return {
                list: payload,
                isLoading: false
            };
        case loadRequestedQuestionnairesRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case loadRequestedQuestionnairesRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

const currentQuestionnaireReducer = (state: IAppState['questionnaires']['current'] =
    { questions: [], get: {} as IQuestionnaire }, { payload, type }) => {
    switch (type) {
        case addSelectedQuestionsRoutine.SUCCESS:
            return {
                ...state,
                questions: [...state.questions, ...payload],
                isLoading: false
            };
        case loadOneQuestionnaireRoutine.SUCCESS:
            return {
                ...state,
                get: payload,
                isLoading: false
            };
        case deleteFromQuestionnaireRoutine.SUCCESS:
        case copyQuestionInQuestionnaireRoutine.SUCCESS:
        case loadQuestionnaireQuestionsRoutine.SUCCESS:
            return {
                ...state,
                questions: payload,
                isLoading: false
            };
        case addNewQuestionToQuestionnaireRoutine.SUCCESS:
            return {
                ...state,
                questions: [payload, ...state.questions],
                isLoading: false
            };
        case deleteFromQuestionnaireRoutine.TRIGGER:
        case copyQuestionInQuestionnaireRoutine.TRIGGER:
        case addNewQuestionToQuestionnaireRoutine.TRIGGER:
        case loadOneQuestionnaireRoutine.TRIGGER:
        case loadQuestionnaireQuestionsRoutine.TRIGGER:
        case addSelectedQuestionsRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case deleteFromQuestionnaireRoutine.FAILURE:
        case copyQuestionInQuestionnaireRoutine.FAILURE:
        case addNewQuestionToQuestionnaireRoutine.FAILURE:
        case loadQuestionnaireQuestionsRoutine.FAILURE:
        case addSelectedQuestionsRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case loadOneQuestionnaireRoutine.FAILURE:
            return {
                ...state,
                get: {}
            };
        default:
            return state;
    }
};

const questionnairesReducer = combineReducers({
    list: questionnairesListReducer,
    current: currentQuestionnaireReducer,
    pending: pendingQuestionnairesReducer
});

export default questionnairesReducer;
