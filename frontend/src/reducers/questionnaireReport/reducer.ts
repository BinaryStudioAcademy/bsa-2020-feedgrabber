import {IQuestionnaireReport, IRequestShort} from "../../models/report/IReport";
import {
    loadQuestionnaireRequestsRoutine,
    loadReportRoutine
} from "../../sagas/questionnaireReport/routines";

export interface IQuestionnaireReportsState {
    current?: IQuestionnaireReport;
    list?: IRequestShort[];
    isLoading?: boolean;
}

const defaultValues = {
    current: {} as IQuestionnaireReport,
    list: [] as IRequestShort[],
    isLoading: false
};

export default (state: IQuestionnaireReportsState = defaultValues, action): IQuestionnaireReportsState => {
    switch (action.type) {
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
