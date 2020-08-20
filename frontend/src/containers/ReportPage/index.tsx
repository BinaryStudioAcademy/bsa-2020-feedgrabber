import React, { useEffect } from 'react';
import { connect, ConnectedProps } from "react-redux";

import { IAppState } from 'models/IAppState';
import { loadQuestionnaireReportRoutine } from "../../sagas/questionnaireReport/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import LoaderWrapper from "../../components/LoaderWrapper";
import { Tab } from 'semantic-ui-react';
import { IQuestionReport } from "../../models/report/IReport";
import { QuestionType } from "../../models/forms/Questions/IQuesion";
import RadioQuestionReport from "./RadioQuestionReport";

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

  const renderQuestionData = (question: IQuestionReport) => {
    switch (question.type) {
      case QuestionType.radio:
        return <RadioQuestionReport data={question.data} />;
      // case QuestionType.checkbox:
      // case QuestionType.date:
      // case QuestionType.fileUpload:
      // case QuestionType.freeText:
      // case QuestionType.multichoice:
      // case QuestionType.scale:
    }
  };

  const panes = [
    {
      menuItem: 'General',
      render: () => (
        <LoaderWrapper loading={isLoading}>
          <UIColumn>
            {report && (
              <UICard>
                <UICardBlock>
                  <h3>{report.questionnaireTitle}</h3>
                </UICardBlock>
                <UICardBlock>
                  {report.questions.map(q => (
                    <>
                      <h4>{q.title}</h4>
                      <p><b>{q.answers} answers</b></p>
                      {renderQuestionData(q)}
                    </>
                  ))}
                </UICardBlock>
              </UICard>
            )}
          </UIColumn>
        </LoaderWrapper>
      )
    },
    {
      menuItem: 'Respondents',
      render: () => <span>Report for each respondent</span>
    }
  ];

  return (
    <>
      <UIPageTitle title="Report"/>
      <UIContent>
        <Tab panes={panes} />
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
