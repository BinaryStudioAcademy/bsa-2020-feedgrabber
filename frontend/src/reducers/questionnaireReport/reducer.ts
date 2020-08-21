import { IQuestionnaireReport, IRespondentReport } from "../../models/report/IReport";
import {
  clearQuestionnaireReportRoutine,
  loadQuestionnaireReportRoutine,
  loadRespondentReportsRoutine
} from "../../sagas/questionnaireReport/routines";

export interface IQuestionnaireReportState {
  report?: IQuestionnaireReport;
  isLoading?: boolean;
  respondentReports?: IRespondentReport[];
  isLoadingRespondentReports?: boolean;
}

export default (state: IQuestionnaireReportState = {}, action): IQuestionnaireReportState => {
  switch (action.type) {
    case clearQuestionnaireReportRoutine.TRIGGER:
      return {
        ...state,
        report: undefined
      };

    case loadQuestionnaireReportRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case loadQuestionnaireReportRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        report: action.payload
      };
    case loadQuestionnaireReportRoutine.FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case loadRespondentReportsRoutine.TRIGGER:
      return {
        ...state,
        isLoadingRespondentReports: true
      };
    case loadRespondentReportsRoutine.SUCCESS:
      return {
        ...state,
        isLoadingRespondentReports: false,
        respondentReports: action.payload
      };
    case loadRespondentReportsRoutine.FAILURE:
      return {
        ...state,
        isLoadingRespondentReports: false
      };
    default:
      return state;
  }
};
