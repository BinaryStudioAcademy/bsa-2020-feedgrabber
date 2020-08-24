import {
    IQuestionnaireReport,
    IRequestShort,
    IRespondentReport,
    IRespondentReportPreview
} from "../../models/report/IReport";
import {
    loadQuestionnaireRequestsRoutine,
    loadReportRoutine,
    loadRespondentReportRoutine,
    loadRespondentReportsRoutine
} from "../../sagas/report/routines";

export interface IQuestionnaireReportsState {
    currentFullReport?: IQuestionnaireReport;
    requests?: IRequestShort[];
    responsesPreview: IRespondentReportPreview[];
    currentUserReport: IRespondentReport;
    isLoading?: boolean;
    isLoadingPreviews?: boolean;
    isLoadingUserReport?: boolean;
}

const defaultValues = {
    currentFullReport: {} as IQuestionnaireReport,
    requests: [] as IRequestShort[],
    currentUserReport: {} as IRespondentReport,
    responsesPreview: [] as IRespondentReportPreview[],
    isLoadingUserReport: false,
    isLoadingPreviews: false,
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
                requests: payload
            };
        case loadReportRoutine.SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentFullReport: payload
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
        case loadRespondentReportsRoutine.TRIGGER:
            return {
                ...state,
                isLoadingPreviews: true
            };
        case loadRespondentReportsRoutine.FAILURE:
            return {
                ...state,
                isLoadingPreviews: false
            };
        case loadRespondentReportsRoutine.SUCCESS:
            return {
              ...state,
              isLoadingPreviews: false,
              responsesPreview: payload
            };
        default:
            return state;
    }
};
