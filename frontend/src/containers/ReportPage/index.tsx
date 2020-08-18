import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {IAppState} from 'models/IAppState';
import {loadQuestionnaireReportRoutine} from "../../sagas/questionnaireReport/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import LoaderWrapper from "../../components/LoaderWrapper";

const ReportPage: React.FC<ConnectedReportPageProps & { match }> = (
  {
    match,
    report,
    isLoading,
    loadQuestionnaireReport
  }
) => {
  useEffect(() => {
    if (!report && !isLoading) {
      loadQuestionnaireReport(match.params.id);
    }
  }, [report, isLoading, loadQuestionnaireReport, match]);

  return (
    <>
      <UIPageTitle title="Report"/>
      <UIContent>
        <LoaderWrapper loading={isLoading}>
          <UIColumn wide>
            <UICard>
              <UICardBlock>
                {report && <h3>{report.questionnaireTitle}</h3>}
              </UICardBlock>
            </UICard>
          </UIColumn>
        </LoaderWrapper>
      </UIContent>
    </>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  report: rootState.questionnaireReport.report,
  isLoading: rootState.questionnaireReport.isLoading
});

const mapDispatchToProps = {
  loadQuestionnaireReport: loadQuestionnaireReportRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectedReportPageProps = ConnectedProps<typeof connector>;

export default connector(ReportPage);
