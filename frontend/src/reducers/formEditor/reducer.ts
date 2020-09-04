import {IQuestionnaire} from "../../models/forms/Questionnaires/types";
import {IAppState} from "../../models/IAppState";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {
    createSectionRoutine,
    deleteQuestionFromSectionRoutine,
    loadSavedSectionsByQuestionnaireRoutine,
    loadSectionsByQuestionnaireRoutine,
    setCurrentSectionRoutine,
    updateSectionsRoutine
} from "sagas/sections/routines";
import {
    addSelectedQuestionsRoutine,
    loadQuestionByIdRoutine,
    loadQuestionsBySectionRoutine,
    loadQuestionsRoutine,
    saveQuestionRoutine
} from "sagas/questions/routines";
import {
    loadOneQuestionnaireRoutine,
    saveAndGetQuestionnaireRoutine,
    setCurrentIdRoutine
} from "../../sagas/qustionnaires/routines";

const init = {
    questionnaire: {} as IQuestionnaire,
    sections: {
        list: [] as ISection[],
        current: {title: ''} as ISection
    },
    currentQuestion: {} as IQuestion,
    isLoading: false
};

const formEditorReducer = (state: IAppState["formEditor"] = init, {type, payload}) => {
    switch (type) {
        case setCurrentSectionRoutine.TRIGGER:
        case createSectionRoutine.SUCCESS:
            return {
                ...state,
                sections: {
                    ...state.sections,
                    current: payload
                }
            };
        case loadOneQuestionnaireRoutine.SUCCESS:
        case saveAndGetQuestionnaireRoutine.SUCCESS:
            return {
                ...state,
                questionnaire: payload,
                isLoading: false
            };
        case loadSectionsByQuestionnaireRoutine.SUCCESS:
        case loadSavedSectionsByQuestionnaireRoutine.SUCCESS:
        case updateSectionsRoutine.SUCCESS:
            return {
                ...state,
                sections: {
                    list: payload,
                    current: payload[0]
                },
                isLoading: false
            };
        case loadQuestionsBySectionRoutine.SUCCESS:
            return {
                ...state,
                isLoading: false,
                sections: {
                    ...state.sections,
                    current: {
                        ...state.sections.current,
                        questions: payload
                    }
                }
            };
        case saveQuestionRoutine.SUCCESS:
        case deleteQuestionFromSectionRoutine.SUCCESS:
            return {
                ...state,
                sections: state.sections.list.map(s => s.id === payload.id ? {...s, questions: payload.questions} : s),
                isLoading: false
            };
        case setCurrentIdRoutine.TRIGGER:
            return {
                ...state,
                questionnaire: {...state.questionnaire, id: payload}
            };
        case loadOneQuestionnaireRoutine.TRIGGER:
        case saveAndGetQuestionnaireRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case addSelectedQuestionsRoutine.FAILURE:
        case saveAndGetQuestionnaireRoutine.FAILURE:
        case loadSectionsByQuestionnaireRoutine.FAILURE:
        case loadSavedSectionsByQuestionnaireRoutine.FAILURE:
        case loadQuestionsBySectionRoutine.FAILURE:
        case loadOneQuestionnaireRoutine.FAILURE:
        case loadQuestionsRoutine.TRIGGER:
        case loadQuestionByIdRoutine.TRIGGER:
        case saveQuestionRoutine.TRIGGER:
        case loadSectionsByQuestionnaireRoutine.TRIGGER:
        case loadSavedSectionsByQuestionnaireRoutine.TRIGGER:
        case loadQuestionsBySectionRoutine.TRIGGER:
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

export default formEditorReducer;

export interface ISectionsState {
    questionnaireId?: string;
    list?: ISection[];
    current?: ISection;
}

export interface ISection {
    id?: string;
    title: string;
    description?: string;
    questions?: IQuestion[];
}
