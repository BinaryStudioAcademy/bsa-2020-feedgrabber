import {
    IQuestionnaireReport,
    IRequestShort,
	IReportShort,
    IRespondentReportPreview
} from "../../models/report/IReport";
import {
    loadQuestionnaireRequestsRoutine,
    loadReportRoutine,
	loadReportsRoutine,
    loadRespondentReportRoutine,
    loadRespondentReportsRoutine
} from "../../sagas/report/routines";
import {IQuestion} from "../../models/forms/Questions/IQuesion";

export interface IQuestionnaireReportsState {
    currentFullReport?: IQuestionnaireReport;
    requests?: IRequestShort[];
	reports?: IReportShort[];
    responsesPreview: IRespondentReportPreview[];
    currentUserReport: IQuestion[];
    isLoading?: boolean;
    isLoadingPreviews?: boolean;
    isLoadingUserReport?: boolean;
}

const defaultValues = {
    currentFullReport: {} as IQuestionnaireReport,
    requests: [] as IRequestShort[],
	reports: [] as IReportShort[],
    currentUserReport: [] as IQuestion[],
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
        case loadReportsRoutine.SUCCESS:
            return {
                ...state,
                reports: payload
            };
        case loadReportsRoutine.FAILURE:
            return {
                ...state,
                reports: []
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
