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
    current?: IQuestionnaireReport;
    list?: IRequestShort[];
    isLoading?: boolean;
    currentUserReport: IRespondentReport;
    isLoadingUserReport?: boolean;
    currentUsersReports: IRespondentReportPreview[];
    isLoadingUsersReports?: boolean;
}

const defaultValues = {
    current: {} as IQuestionnaireReport,
    list: [] as IRequestShort[],
    currentUserReport: {} as IRespondentReport,
    currentUsersReports: [] as IRespondentReportPreview[],
    isLoadingUsersReports: false,
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
        case loadRespondentReportsRoutine.TRIGGER:
            return {
                ...state,
                isLoadingUsersReports: true
            };
        case loadRespondentReportsRoutine.FAILURE:
            return {
                ...state,
                isLoadingUsersReports: false
            };
        case loadRespondentReportsRoutine.SUCCESS:
            return {
              ...state,
              isLoadingUsersReports: false,
              currentUsersReports: payload
            };
        default:
            return state;
    }
};
