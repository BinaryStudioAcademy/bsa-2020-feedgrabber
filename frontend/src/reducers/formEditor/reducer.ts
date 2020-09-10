import {IQuestionnaire} from "../../models/forms/Questionnaires/types";
import {IAppState} from "../../models/IAppState";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {loadOneQuestionnaireRoutine, saveAndGetQuestionnaireRoutine} from "../../sagas/qustionnaires/routines";
import {getById} from "../../helpers/formEditor.helper";
import {
    addQToFormRoutine,
    addSectionRoutine,
    clearFormEditor,
    deleteQInFormRoutine,
    deleteSectionRoutine,
    loadFormRoutine,
    setCurrentQInForm,
    setCurrentSection,
    updateOrderInForm,
    updateQInFormRoutine,
    updateSectionRoutine
} from "../../sagas/sections/routines";

const init = {
    questionnaire: {} as IQuestionnaire,
    sections: {
        entities: {},
        ids: [],
        currentId: ''
    } as NormalizedState<SectionEntity>,
    questions: {
        entities: {},
        ids: [],
        currentId: ''
    } as NormalizedState<QuestionEntity>,
    isLoading: false
};

export interface IFormEditorState {
    questionnaire: IQuestionnaire;
    sections: NormalizedState<SectionEntity>;
    questions: NormalizedState<QuestionEntity>;
    isLoading: boolean;
}

export interface ISection {
    title: string;
    description?: string;
}

export type SectionEntity = {
    id: string;
    section: ISection;
    questions: string[];
}

export type QuestionEntity = {
    id: string;
    section: string;
    question: IQuestion;
}

export type NormalizedState<T> = {
    entities: {
        [id: string]: T;
    };
    ids: string[];
    currentId: string;
}

const formEditorReducer = (state: IAppState["formEditor"] = init, {type, payload}) => {
    switch (type) {
        case setCurrentSection.TRIGGER:
            return {
                ...state,
                sections: {
                    ...state.sections,
                    currentId: payload
                }
            };
        case setCurrentQInForm.TRIGGER:
            return {
                ...state,
                questions: {
                    ...state.questions,
                    currentId: payload
                }
            };
        case clearFormEditor.TRIGGER:
            return {
                ...init,
                questionnaire: state.questionnaire
            };
        case deleteSectionRoutine.TRIGGER:
            const deleteSection = () => {
                const sectionId = payload;
                const s = getById<SectionEntity>(sectionId, state.sections);

                const stateQ = state.questions.entities;
                const newQs = Object.keys(stateQ).reduce((object, key) => {
                    if (!s.questions.find(q => q === key)) object[key] = stateQ[key];
                    return object;
                }, {});

                const stateS = state.sections.entities;
                const newSq = Object.keys(stateS).reduce((object, key) => {
                    if (key !== s.id) object[key] = stateS[key];
                    return object;
                }, {});

                const idsS = state.sections.ids;
                const indexS = idsS.findIndex(i => i === sectionId);
                const sCurId = idsS[indexS - 1] || idsS[indexS + 1] || '';

                const newQIds = state.questions.ids.filter(q => !s.questions.find(q2 => q2 === q));
                const qCurId = getById(sCurId, state.sections)?.questions[0] || '';

                return {
                    ...state,
                    sections: {
                        ...state.sections,
                        entities: newSq,
                        ids: state.sections.ids.filter(id => id !== s.id),
                        currentId: sCurId
                    },
                    questions: {
                        ...state.questions,
                        entities: newQs,
                        ids: newQIds,
                        currentId: qCurId
                    }
                };
            };
            return deleteSection();
        case updateOrderInForm.TRIGGER:
            return {
                ...state,
                sections: {
                    ...state.sections,
                    entities: {
                        ...state.sections.entities,
                        [payload.sectionId]: {
                            ...state.sections.entities[payload.sectionId],
                            questions: payload.questions
                        }
                    }
                },
                questions: {
                    ...state.questions,
                    entities: {
                        ...state.questions.entities,
                        [payload.questionId]: {
                            ...state.questions.entities[payload.questionId],
                            section: payload.sectionId
                        }
                    }
                }
            };
        case addSectionRoutine.SUCCESS:
            const addSection = () => {
                const {id, title, description = ''} = payload;
                return {
                    ...state,
                    sections: {
                        ...state.sections,
                        ids: [...state.sections.ids, id],
                        currentId: id,
                        entities: {
                            ...state.sections.entities,
                            [id]: {
                                id,
                                section: {title, description},
                                questions: []
                            }
                        }
                    }
                };
            };
            return addSection();
        case updateSectionRoutine.SUCCESS:
            const updateSection = () => {
                const {id, title, description = ''} = payload;
                const prev = state.sections.entities[id];
                return {
                    ...state,
                    sections: {
                        ...state.sections,
                        entities: {
                            ...state.sections.entities,
                            [id]: {
                                ...prev,
                                section: {title, description}
                            }
                        }
                    }
                };
            };
            return updateSection();
        // case loadOneQuestionnaireRoutine.SUCCESS:
        // case saveAndGetQuestionnaireRoutine.SUCCESS:
        //     return {
        //         ...state,
        //         questionnaire: payload,
        //         isLoading: false
        //     };
        // case loadSavedSectionsByQuestionnaireRoutine.SUCCESS:
        case loadFormRoutine.SUCCESS:
            return payload;
        case deleteQInFormRoutine.TRIGGER:
            const deleteQuestion = () => {
                const {questionId, sectionId} = payload;
                const s = getById<SectionEntity>(sectionId, state.sections);
                const stateQ = state.questions.entities;
                const newEntities = Object.keys(stateQ).reduce((object, key) => {
                    if (key !== questionId) object[key] = stateQ[key];
                    return object;
                }, {});
                const ids = s.questions;
                const index = ids.findIndex(i => i === questionId);
                const currentId = ids[index - 1] || ids[index + 1] || '';

                return {
                    ...state,
                    questions: {
                        ...state.questions,
                        entities: newEntities,
                        ids: state.questions.ids.filter(q => q !== questionId),
                        currentId
                    },
                    sections: {
                        ...state.sections,
                        entities: {
                            ...state.sections.entities,
                            [sectionId]: {
                                ...s,
                                questions: ids.filter(q => q !== questionId)
                            }
                        }
                    }
                };
            };
            return deleteQuestion();
        case updateQInFormRoutine.SUCCESS:
            const prevQs = getById<QuestionEntity>(payload.id, state.questions);
            return {
                ...state,
                questions: {
                    ...state.questions,
                    entities: {
                        ...state.questions.entities,
                        [payload.id]: {
                            ...prevQs,
                            question: payload.question
                        }
                    }
                }
            };
        case addQToFormRoutine.SUCCESS:
            const {sectionId, question, id} = payload;
            const sq = getById<SectionEntity>(sectionId, state.sections);
            return {
                ...state,
                questions: {
                    ...state.questions,
                    entities: {
                        ...state.questions.entities,
                        [id]: {
                            id,
                            section: sectionId,
                            question
                        }
                    },
                    currentId: id,
                    ids: state.questions.ids.concat(id)
                },
                sections: {
                    ...state.sections,
                    entities: {
                        ...state.sections.entities,
                        [sectionId]: {
                            ...sq,
                            questions: sq.questions.concat(id)
                        }
                    }
                }
            };
        case loadOneQuestionnaireRoutine.TRIGGER:
        case saveAndGetQuestionnaireRoutine.TRIGGER:
        case loadFormRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case saveAndGetQuestionnaireRoutine.FAILURE:
        case loadFormRoutine.FAILURE:
        case loadOneQuestionnaireRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default formEditorReducer;

