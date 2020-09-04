import { ISectionsState } from "../section/reducer";
import { IQuestionnaire } from "../../models/forms/Questionnaires/types";
import { IAppState } from "../../models/IAppState";
import { IQuestion } from "../../models/forms/Questions/IQuesion";
import {
    setCurrentSectionRoutine,
    createSectionRoutine,
    loadSectionsByQuestionnaireRoutine,
    setCurrentSectionIdRoutine,
    updateSectionsRoutine,
    deleteQuestionFromSectionRoutine, loadSavedSectionsByQuestionnaireRoutine
} from "sagas/sections/routines";
import { loadQuestionsBySectionRoutine } from "sagas/questions/routines";

const init = {
    questionnaire: {} as IQuestionnaire,
    sections: {} as ISectionsState,
    currentQuestion: {} as IQuestion,
    isLoading: false
};

const formEditorReducer = (state: IAppState["formEditor"] = init, { type, payload }) => {
    switch (type) {
        case setCurrentSectionRoutine.TRIGGER:
        case createSectionRoutine.SUCCESS:
        case deleteQuestionFromSectionRoutine.SUCCESS:
            return {
                ...state,
                sections: {
                    ...state.sections,
                    current: payload
                }
            };
        case loadSectionsByQuestionnaireRoutine.TRIGGER:
        case loadSavedSectionsByQuestionnaireRoutine.TRIGGER:
        case loadQuestionsBySectionRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true,
                sections: {
                    ...state.sections,
                    questionnaireId: payload
                }
            };
        case loadSectionsByQuestionnaireRoutine.SUCCESS:
        case loadSavedSectionsByQuestionnaireRoutine.SUCCESS:
        case updateSectionsRoutine.SUCCESS:
            return {
                ...state,
                sections: {
                    ...state.sections,
                    list: payload,
                    current: payload[0]
                }
            };
        case loadSectionsByQuestionnaireRoutine.FAILURE:
        case loadSavedSectionsByQuestionnaireRoutine.FAILURE:
        case loadQuestionsBySectionRoutine.FAILURE:
            return {
                ...state,
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
        case setCurrentSectionIdRoutine.SUCCESS:
            return {
                ...state,
                sections: {
                    ...state.sections,
                    current: {
                        ...state.sections.current,
                        id: payload
                    }
                }
            };
        default:
            return state;
    }
};

export default formEditorReducer;
