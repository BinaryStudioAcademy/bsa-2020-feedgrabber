import {IQuestionnaireReport, IRequestShort} from "../../models/report/IReport";
import {
    clearQuestionnaireReportRoutine,
    loadQuestionnaireRequestsRoutine,
    loadReportRoutine
} from "../../sagas/questionnaireReport/routines";

export interface IQuestionnaireReportsState {
    current?: IQuestionnaireReport;
    list?: IRequestShort[];
    isLoading?: boolean;
}

export default (state: IQuestionnaireReportsState = {}, action): IQuestionnaireReportsState => {
    switch (action.type) {
        case clearQuestionnaireReportRoutine.TRIGGER:
            return {
                ...state,
                current: undefined
            };
        case loadReportRoutine.TRIGGER:
        case loadQuestionnaireRequestsRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case loadQuestionnaireRequestsRoutine.SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: action.payload
            };
        case loadReportRoutine.SUCCESS:
            return {
                ...state,
                isLoading: false,
                current: action.payload
            };
        case loadReportRoutine.FAILURE:
        case loadQuestionnaireRequestsRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
};
