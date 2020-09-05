import {IQuestionnaire} from "../../models/forms/Questionnaires/types";
import {IAppState} from "../../models/IAppState";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {
    addExistingQuestionToSectionRoutine,
    addQuestionToSectionRoutine,
    createSectionRoutine,
    deleteQuestionFromSectionRoutine,
    loadSavedSectionsByQuestionnaireRoutine,
    loadSectionsByQuestionnaireRoutine,
    setCurrentQuestionInSection,
    setCurrentSectionRoutine,
    updateQuestionInSectionRoutine,
    updateSectionRoutine
} from "sagas/sections/routines";
import {
    addSelectedQuestionsRoutine,
    loadQuestionsBySectionRoutine,
    loadQuestionsRoutine,
    saveQuestionRoutine
} from "sagas/questions/routines";
import {loadOneQuestionnaireRoutine, saveAndGetQuestionnaireRoutine} from "../../sagas/qustionnaires/routines";

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
            return {
                ...state,
                sections: {
                    ...state.sections,
                    current: payload
                }
            };
        case createSectionRoutine.SUCCESS:
            return {
                ...state,
                sections: {
                    list: [...state.sections.list, payload],
                    current: payload
                },
                isLoading: false
            };
        case updateSectionRoutine.SUCCESS:
            return {
                ...state,
                sections: {
                    current: {...state.sections.current, ...payload},
                    list: state.sections.list.map(s => s.id === payload.id ? {...s, ...payload} : s)
                },
                isLoading: false
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
                sections: {
                    ...state.sections,
                    current: {
                        ...state.sections.current,
                        questions: payload
                    }
                },
                isLoading: false
            };
        case setCurrentQuestionInSection.TRIGGER:
            return {
                ...state,
                currentQuestion: payload
            };
        case updateQuestionInSectionRoutine.SUCCESS:
        case addQuestionToSectionRoutine.SUCCESS:
        case addExistingQuestionToSectionRoutine.SUCCESS:
        case deleteQuestionFromSectionRoutine.SUCCESS:
            const {sectionId, questions, questionId} = payload;
            const curQ = questionId ? questions.find(q => q.id === questionId) : {};
            const list = state.sections.list.map(s => s.id === sectionId ? {...s, questions} : s);

            return {
                ...state,
                sections: {
                    current: {...state.sections.current, questions: questions},
                    list
                },
                currentQuestion: curQ,
                isLoading: false
            };
        case loadOneQuestionnaireRoutine.TRIGGER:
        case deleteQuestionFromSectionRoutine.TRIGGER:
        case addQuestionToSectionRoutine.TRIGGER:
        case addExistingQuestionToSectionRoutine.TRIGGER:
        case updateQuestionInSectionRoutine.TRIGGER:
        case saveAndGetQuestionnaireRoutine.TRIGGER:
        case loadQuestionsRoutine.TRIGGER:
        case loadSectionsByQuestionnaireRoutine.TRIGGER:
        case createSectionRoutine.TRIGGER:
        case loadSavedSectionsByQuestionnaireRoutine.TRIGGER:
        case loadQuestionsBySectionRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case addSelectedQuestionsRoutine.FAILURE:
        case addQuestionToSectionRoutine.FAILURE:
        case addExistingQuestionToSectionRoutine.FAILURE:
        case deleteQuestionFromSectionRoutine.FAILURE:
        case updateQuestionInSectionRoutine.FAILURE:
        case saveAndGetQuestionnaireRoutine.FAILURE:
        case loadSectionsByQuestionnaireRoutine.FAILURE:
        case loadSavedSectionsByQuestionnaireRoutine.FAILURE:
        case loadQuestionsBySectionRoutine.FAILURE:
        case loadOneQuestionnaireRoutine.FAILURE:
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
