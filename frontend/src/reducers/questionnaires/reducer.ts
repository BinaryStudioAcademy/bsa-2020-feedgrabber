import {
    addQuestionnaireRoutine,
    deleteQuestionnaireRoutine,
    hideModalQuestionnaireRoutine,
    loadQuestionnairesRoutine,
    saveAndGetQuestionnaireRoutine,
    setQuestionnairePaginationRoutine,
    showModalQuestionnaireRoutine,
    updateQuestionnaireRoutine
} from '../../sagas/qustionnaires/routines';
import {IAppState} from "../../models/IAppState";
import {combineReducers} from "redux";
import {IRequest} from "../../models/forms/Questionnaires/types";
import {loadRequestedQuestionnairesRoutine} from 'sagas/request/routines';

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
        case saveAndGetQuestionnaireRoutine.SUCCESS:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    total: state.pagination?.total + 1,
                    items: [...state.pagination?.items ?? [], action.payload]
                }
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
                                          {list: [] as IRequest[], isLoading: false}, {payload, type}) => {
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

const questionnairesReducer = combineReducers({
    list: questionnairesListReducer,
    pending: pendingQuestionnairesReducer
});

export default questionnairesReducer;
