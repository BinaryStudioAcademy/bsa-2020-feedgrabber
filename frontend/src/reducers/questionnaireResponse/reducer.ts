import { IAppState } from "models/IAppState";
import { loadRequestedQuestionnairesRoutine } from "sagas/request/routines";
import {
    loadResponseFormRoutine,
    saveResponseRoutine
} from "../../sagas/response/routines";
import {IQuestionnaire} from "../../models/forms/Questionnaires/types";
import {IQuestion} from "../../models/forms/Questions/IQuesion";

export interface IQuestionnaireResponse {
    id?: string;
    requestId: string;
    questionnaire: IQuestionnaire;
    expirationDate: Date;
    answeredAt: string;
    closeDate: string;
    changeable: boolean;
}

export interface IQuestionnaireResponseState {
    list: IQuestionnaireResponse[];
    current: {
        info: IQuestionnaireResponse;
        sections: SectionWithQuestions[];
    };
    isLoading: boolean;
}

type SectionWithQuestions = {
    id: string;
    title: string;
    description: string;
    questions: IQuestion[];
}

const init = {
    list: [] as IQuestionnaireResponse[],
    current: {
        info: {} as IQuestionnaireResponse,
        sections: [] as SectionWithQuestions[]
    },
    isLoading: false
};

const responseReducer = (state: IAppState['questionnaireResponse'] = init, {type, payload}) => {
    switch(type) {
        case loadResponseFormRoutine.SUCCESS:
            return {
                ...state,
                current: payload,
                isLoading: false
            };
        case loadRequestedQuestionnairesRoutine.SUCCESS:
            return {
                ...state,
                list: payload,
                isLoading: false
            };
        case saveResponseRoutine.TRIGGER:
        case loadRequestedQuestionnairesRoutine.TRIGGER:
        case loadResponseFormRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case saveResponseRoutine.FAILURE:
        case saveResponseRoutine.SUCCESS:
        case loadRequestedQuestionnairesRoutine.FAILURE:
        case loadResponseFormRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default responseReducer;
