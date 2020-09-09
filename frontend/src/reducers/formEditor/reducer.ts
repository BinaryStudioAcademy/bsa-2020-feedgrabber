import {IQuestionnaire} from "../../models/forms/Questionnaires/types";
import {IAppState} from "../../models/IAppState";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {
    addQToFormRoutine,
    addSectionRoutine,
    deleteQuestionFromSectionRoutine,
    loadSavedSectionsByQuestionnaireRoutine,
    loadFormRoutine,
    setCurrentQuestionInSection,
    setCurrentSection,
    updateQInFormRoutine,
    updateSectionRoutine,
    setSections
} from "sagas/sections/routines";
import {
    addSelectedQuestionsRoutine,
    loadQuestionsBySectionRoutine,
    saveQuestionRoutine
} from "sagas/questions/routines";
import {loadOneQuestionnaireRoutine, saveAndGetQuestionnaireRoutine} from "../../sagas/qustionnaires/routines";

const init = {
    questionnaire: {} as IQuestionnaire,
    sections: {} as NormalizedState<Section>,
    questions: {} as NormalizedState<SectionQuestion>,
    isLoading: false
};

export interface IFormEditorState {
    questionnaire: IQuestionnaire;
    sections: NormalizedState<Section>;
    questions: NormalizedState<SectionQuestion>;
    isLoading: boolean;
}

const formEditorReducer = (state: IAppState["formEditor"] = init, {type, payload}) => {
    switch (type) {
        case setCurrentSection.TRIGGER:
            return {
                ...state,
                sections: {
                    ...state.sections,
                    current: payload
                }
            };
        case addSectionRoutine.SUCCESS:
            payload.questions = [];
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
        case loadFormRoutine.SUCCESS:
        case loadSavedSectionsByQuestionnaireRoutine.SUCCESS:
            return {
                ...state,
                sections: {
                    list: payload,
                    current: payload[0]
                },
                currentQuestion: {},
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
                sections: {
                    ...state.sections,
                    current: state.sections.list?.find(s => s.questions.find(q => q.id === payload.id))
                },
                currentQuestion: payload
            };
        case setSections.TRIGGER:
            console.log(payload);
            return {
                ...state,
                sections: {
                    list: payload.sections,
                    current: payload.currentSection
                },
                currentQuestion: payload.currentQuestion ?? state.currentQuestion
            };
        case deleteQuestionFromSectionRoutine.SUCCESS:
            const qs = state.sections.list.flatMap(s => s.questions.map(q => {
                q.sectionId = s.id;
                return q;
            }));
            const index = qs.findIndex(q => q.id === payload.questionId);
            const q = qs[index - 1] || qs[index + 1];
            const qsct = {...state.sections.current, questions: payload.questions};
            const l = state.sections.list.map(s => s.id === payload.sectionId ? qsct : s);
            return {
                ...state,
                sections: {
                    current: l.find(s => s.id === q?.sectionId) ?? {...state.sections.current, questions: []},
                    list: l
                },
                currentQuestion: q ?? {},
                isLoading: false
            };
        case updateQInFormRoutine.SUCCESS:
        case addQToFormRoutine.SUCCESS:
            const {sectionId, questions, questionId} = payload;
            let cq = questions.find(q => q.id === questionId);
            const list = state.sections.list.map(s => s.id === sectionId ? {...s, questions} : s);

            if (type === updateQInFormRoutine.SUCCESS) {
                cq = cq.id === state.currentQuestion.id ? cq : state.currentQuestion;
            }

            return {
                ...state,
                sections: {
                    current: {...state.sections.current, questions},
                    list
                },
                currentQuestion: cq,
                isLoading: false
            };
        case loadOneQuestionnaireRoutine.TRIGGER:
        case saveAndGetQuestionnaireRoutine.TRIGGER:
        case loadFormRoutine.TRIGGER:
        case loadSavedSectionsByQuestionnaireRoutine.TRIGGER:
        case loadQuestionsBySectionRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case addSelectedQuestionsRoutine.FAILURE:
        case updateQInFormRoutine.FAILURE:
        case saveAndGetQuestionnaireRoutine.FAILURE:
        case loadFormRoutine.FAILURE:
        case loadSavedSectionsByQuestionnaireRoutine.FAILURE:
        case loadQuestionsBySectionRoutine.FAILURE:
        case loadOneQuestionnaireRoutine.FAILURE:
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

export interface ISection {
    title: string;
    description?: string;
}

type Section = {
    id: string;
    section: ISection;
    questions: string[];
}

type SectionQuestion = {
    id: string;
    section: string;
    question: IQuestion;
}

type NormalizedState<T> = {
    byId: {
        [id: string]: T;
    };
    allIds: string[];
    currentId: string;
}
