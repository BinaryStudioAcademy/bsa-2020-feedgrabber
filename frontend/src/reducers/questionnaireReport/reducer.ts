import {IQuestionnaireReport} from "../../models/report/IReport";
import {
  clearQuestionnaireReportRoutine,
  loadQuestionnaireReportRoutine
} from "../../sagas/questionnaireReport/routines";

export interface IQuestionnaireReportState {
  report?: IQuestionnaireReport;
  isLoading?: boolean;
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

    default:
      return state;
  }
};
