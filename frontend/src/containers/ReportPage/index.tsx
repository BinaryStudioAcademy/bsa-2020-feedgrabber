import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from "react-redux";

import { IAppState } from 'models/IAppState';
import {
  loadQuestionnaireReportRoutine,
  loadRespondentReportsRoutine
} from "../../sagas/questionnaireReport/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import UITab from "../../components/UI/UITab";
import LoaderWrapper from "../../components/LoaderWrapper";
import { Tab, Segment, Header } from 'semantic-ui-react';
import { IQuestionReport } from "../../models/report/IReport";
import { IQuestion, QuestionType } from "../../models/forms/Questions/IQuesion";
import RadioQuestionReport from "./RadioQuestionReport";
import ReportSwitcher from "./ReportSwitcher";
import { ScaleQuestionResponse } from "../../components/ResponseQuestion/ScaleQuestionResponse";
import { CheckboxResponse } from "../../components/ResponseQuestion/CheckboxResponse";
import { MultiChoiceResponse } from "../../components/ResponseQuestion/MultiChoiceResponse";
import { DateSelectionResponse } from "../../components/ResponseQuestion/DateSelectionResponse";
import { FreeTextResponse } from "../../components/ResponseQuestion/FreeTextResponse";
import RadioButtonResponse from "../../components/ResponseQuestion/RadioButtonResponse";

import styles from './styles.module.sass';

const ReportPage: React.FC<ConnectedReportPageProps & { match }> = (
  {
    match,
    report,
    isLoadingReport,
    respondentReports,
    isLoadingRespondentReports,
    loadQuestionnaireReport,
    loadRespondentReports
  }
) => {
  const [currentReport, setCurrentReport] = useState<number>(1);

  useEffect(() => {
    if (!report && !isLoadingReport) {
      loadQuestionnaireReport(match.params.id);
    }
  }, [report, isLoadingReport, loadQuestionnaireReport, match]);

  useEffect(() => {
    if (!respondentReports && !isLoadingRespondentReports) {
      loadRespondentReports(match.params.id);
    }
  }, [respondentReports, isLoadingRespondentReports, loadRespondentReports, match]);

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

  const renderQuestionResponse = (question: IQuestion) => {
    switch (question.type) {
      case QuestionType.scale:
        return <ScaleQuestionResponse question={question} response={question.answer} />;
      case QuestionType.date:
        return <DateSelectionResponse question={question} response={question.answer} />;
      case QuestionType.radio:
        return <RadioButtonResponse question={question} response={question.answer} />;
      case QuestionType.checkbox:
        return <CheckboxResponse question={question} response={question.answer} />;
      case QuestionType.freeText:
        return <FreeTextResponse question={question} response={question.answer} />;
      // case QuestionType.multichoice:
      //   return <MultiChoiceResponse question={question} />;
      default:
        return <span>Error</span>;
    }
  };

  const renderRespondentReport = () => {
    const reportData = respondentReports[currentReport - 1];
    return (
      <div className={styles.report_page_block}>
        <Header as='h4'>Respondent: {reportData.respondent}</Header>
        {reportData.answers.map(question => (
          <Segment key={question.id}>
            <Header as='h4'>{question.name}</Header>
            {renderQuestionResponse(question)}
          </Segment>
        ))}
      </div>
    );
  };

  const panes = [
    {
      menuItem: 'General',
      render: () => (
        <Tab.Pane>
          <LoaderWrapper loading={isLoadingReport}>
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
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Respondents',
      render: () => (
        <Tab.Pane>
          <LoaderWrapper loading={isLoadingRespondentReports}>
            {respondentReports && (
              <UIColumn wide>
                <ReportSwitcher from={1}
                                to={respondentReports.length}
                                setIndex={setCurrentReport} />
                {renderRespondentReport()}
              </UIColumn>
            )}
          </LoaderWrapper>
        </Tab.Pane>
      )
    }
  ];

  return (
    <>
      <UIPageTitle title="Report"/>
      <UIContent>
        <UITab panes={panes} menuPosition="left" />
      </UIContent>
    </>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  report: rootState.questionnaireReport.report,
  isLoadingReport: rootState.questionnaireReport.isLoading,
  respondentReports: rootState.questionnaireReport.respondentReports,
  isLoadingRespondentReports: rootState.questionnaireReport.isLoadingRespondentReports
});

const mapDispatchToProps = {
  loadQuestionnaireReport: loadQuestionnaireReportRoutine,
  loadRespondentReports: loadRespondentReportsRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectedReportPageProps = ConnectedProps<typeof connector>;

export default connector(ReportPage);
