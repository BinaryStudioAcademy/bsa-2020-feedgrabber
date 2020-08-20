import { IAppState } from "models/IAppState";
import { loadRequestedQuestionnairesRoutine } from "sagas/request/routines";
import { createResponseRoutine } from "sagas/questionnaireResponse/routines";

const responseReducer = (state: IAppState['questionnaireResponse'] = {isLoading: false}, {type, payload}) => {
    switch(type) {
        case loadRequestedQuestionnairesRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case loadRequestedQuestionnairesRoutine.SUCCESS:
            return {
                ...state,
                list: payload,
                isLoading: false
            };
        case loadRequestedQuestionnairesRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case createResponseRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case createResponseRoutine.SUCCESS:
            return {
                ...state,
                isLoading: false,
                current: {
                    ...state.current,
                    responseId: payload
                }
            };
        case createResponseRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default responseReducer;