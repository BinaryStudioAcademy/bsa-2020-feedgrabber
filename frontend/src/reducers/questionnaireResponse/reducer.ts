import { IAppState } from "models/IAppState";
import { loadRequestedQuestionnairesRoutine } from "sagas/request/routines";
import { getResponseRoutine,
        addRequestIdToCurrentResponseRoutine,
        saveResponseRoutine } from "sagas/questionnaireResponse/routines";
import { access } from "fs";

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
        case addRequestIdToCurrentResponseRoutine.TRIGGER:
            return {
                ...state,
                current: {
                    ...state.current,
                    requestId: payload
                }
            };
        case getResponseRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case getResponseRoutine.SUCCESS:
            return {
                ...state,
                isLoading: false,
                current: payload
            };
        case getResponseRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case saveResponseRoutine.FAILURE:
        case saveResponseRoutine.SUCCESS:
            return {
                ...state,
                current: payload
            };
        default:
            return state;
    }
};

export default responseReducer;