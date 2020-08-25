import { IAppState } from "models/IAppState";
import { setCurrentSectionRoutine, 
    createSectionRoutine, 
    getSectionsByQuestionnaireRoutine, 
    setCurrentSectionIdRoutine,
    updateSectionsRoutine} from "sagas/sections/routines";
import { loadQuestionsBySectionRoutine } from "sagas/questions/routines";

const sectionsReducer = (state: IAppState["sections"] = {}, {type, payload}) => {
    switch(type) {
        case setCurrentSectionRoutine.TRIGGER:
        case createSectionRoutine.SUCCESS:
            return {
                ...state,
                current: payload
            };
        case getSectionsByQuestionnaireRoutine.TRIGGER:
        case loadQuestionsBySectionRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case getSectionsByQuestionnaireRoutine.SUCCESS:
        case updateSectionsRoutine.SUCCESS:
            return {
                ...state,
                list: payload,
                isLoading: false
            };
        case getSectionsByQuestionnaireRoutine.FAILURE:
        case loadQuestionsBySectionRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case loadQuestionsBySectionRoutine.SUCCESS:
            return {
                ...state,
                isLoading: false,
                current: {
                    ...state.current,
                    questions: payload
                }
            };
        case setCurrentSectionIdRoutine.SUCCESS:
            return {
                ...state,
                current: {
                    ...state.current,
                    id: payload
                }
            };
        default:
            return state;
    }
};

export default sectionsReducer;