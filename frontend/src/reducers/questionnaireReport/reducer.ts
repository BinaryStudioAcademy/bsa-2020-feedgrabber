import {IQuestionnaireReport, IRequestShort, IRespondentReport} from "../../models/report/IReport";
import {
    loadQuestionnaireRequestsRoutine,
    loadReportRoutine, loadRespondentReportRoutine
} from "../../sagas/report/routines";

export interface IQuestionnaireReportsState {
    current?: IQuestionnaireReport;
    list?: IRequestShort[];
    isLoading?: boolean;
    currentUserReport: IRespondentReport;
    isLoadingUserReport?: boolean;
}

const defaultValues = {
    current: {} as IQuestionnaireReport,
    list: [] as IRequestShort[],
    currentUserReport: {} as IRespondentReport,
    isLoadingRespondentReports: false,
    isLoading: false
};

export default (state: IQuestionnaireReportsState = defaultValues, {type, payload}): IQuestionnaireReportsState => {
    switch (type) {
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
                list: payload
            };
        case loadReportRoutine.SUCCESS:
            return {
                ...state,
                isLoading: false,
                current: payload
            };
        case loadReportRoutine.FAILURE:
        case loadQuestionnaireRequestsRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case loadRespondentReportRoutine.SUCCESS:
            return {
                ...state,
                currentUserReport: payload,
                isLoadingUserReport: false
            };
        case loadRespondentReportRoutine.TRIGGER:
            return {
                ...state,
                isLoadingUserReport: true
            };
        case loadRespondentReportRoutine.FAILURE:
            return {
                ...state,
                isLoadingUserReport: false
            };
        default:
            return state;
    }
};
