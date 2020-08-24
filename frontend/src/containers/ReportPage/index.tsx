import React, {FC, useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import { IAppState } from 'models/IAppState';
import {
    loadQuestionnaireReportRoutine, loadReportRoutine,
    loadRespondentReportRoutine
} from "../../sagas/report/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import UITab from "../../components/UI/UITab";
import LoaderWrapper from "../../components/LoaderWrapper";
import { Tab, Segment, Header } from 'semantic-ui-react';
import { IQuestion, QuestionType } from "../../models/forms/Questions/IQuesion";
import { ScaleQuestionResponse } from "../../components/ResponseQuestion/ScaleQuestionResponse";
import { CheckboxResponse } from "../../components/ResponseQuestion/CheckboxResponse";
import { DateSelectionResponse } from "../../components/ResponseQuestion/DateSelectionResponse";
import { FreeTextResponse } from "../../components/ResponseQuestion/FreeTextResponse";
import RadioButtonResponse from "../../components/ResponseQuestion/RadioButtonResponse";
import {
    IQuestionReport,
    IQuestionReportCheckboxData,
    IQuestionReportFreeTextData,
    IQuestionReportRadioData,
    IQuestionReportScaleData,
    IQuestionReportDateData, IQuestionReportFileData, IRespondentReport
} from "../../models/report/IReport";
import RadioQuestionReport from "./RadioQuestionReport";
import FreeTextQuestionReport from "./FreeTextQuestionReport";
import CheckboxQuestionReport from "./CheckboxQuestionReport";
import ScaleQuestionReport from "./ScaleQuestionReport";
import DateSelectionReport from "./DateSelectionReport";
import { FileQuestionReport } from './FileQuestionReport';
import styles from './styles.module.sass';

const ReportPage: FC<ConnectedReportPageProps & { match }> = (
  {
    match,
    report,
    isLoadingReport,
    currentUserReport,
    isLoadingUserReport,
    loadReport,
    loadUserReport
  }
) => {
    useEffect(() => {
        loadReport(match.params.id);
    }, [loadReport, match.params.id]);

    const panes = [
    {
      menuItem: 'General',
      render: () => (
        <Tab.Pane>
          <LoaderWrapper loading={isLoadingReport}>
            <UIColumn>
              {report.questions && (
                <UICard>
                  <UICardBlock>
                    <h3>{report.questionnaireTitle}</h3>
                  </UICardBlock>
                  {report.questions.map(q => (
                    <UICardBlock>
                      <h4>{q.title}</h4>
                      <p><b>{q.answers} answers</b></p>
                      {renderQuestionData(q)}
                    </UICardBlock>
                  ))}
                </UICard>
              )}
            </UIColumn>
          </LoaderWrapper>
        </Tab.Pane>
      )
    }
    // {
    //   menuItem: 'Respondents',
    //   render: () => (
    //     <Tab.Pane>
    //       <LoaderWrapper loading={isLoadingUserReport}>
    //         {respondentReports && (
    //           <UIColumn wide>
    //             <ReportSwitcher from={1}
    //                             to={respondentReports.length}
    //                             startIndex={currentReport}
    //                             setIndex={setCurrentReport} />
    //             {renderRespondentReport()}
    //           </UIColumn>
    //         )}
    //       </LoaderWrapper>
    //     </Tab.Pane>
    //   )
    // }
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
  report: rootState.questionnaireReports.current,
  isLoadingReport: rootState.questionnaireReports.isLoading,
  currentUserReport: rootState.questionnaireReports.currentUserReport,
  isLoadingUserReport: rootState.questionnaireReports.isLoadingUserReport
});

const mapDispatchToProps = {
  loadReport: loadReportRoutine,
  loadUserReport: loadRespondentReportRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectedReportPageProps = ConnectedProps<typeof connector>;

export default connector(ReportPage);

function renderQuestionResponse(question: IQuestion) {
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
        default:
            return undefined;
    }
}

function renderUserReport(userReport: IRespondentReport) {
    return (
        <div className={styles.report_page_block}>
            <Header as='h4'>Respondent: {userReport.respondent}</Header>
            {userReport.answers.map(question => (
                <Segment key={question.id}>
                    <Header as='h4'>{question.name}</Header>
                    {renderQuestionResponse(question)}
                </Segment>
            ))}
        </div>
    );
}

function renderQuestionData(question: IQuestionReport) {
    switch (question.type) {
        case QuestionType.radio:
            return <RadioQuestionReport data={question.data as IQuestionReportRadioData}/>;
        case QuestionType.checkbox:
            return <CheckboxQuestionReport data={question.data as IQuestionReportCheckboxData}/>;
        case QuestionType.date:
            return <DateSelectionReport data={question.data as IQuestionReportDateData}/>;
        case QuestionType.fileUpload:
            return <FileQuestionReport data={question.data as IQuestionReportFileData}/>;
        case QuestionType.freeText:
            return <FreeTextQuestionReport data={question.data as IQuestionReportFreeTextData}/>;
        case QuestionType.scale:
            return <ScaleQuestionReport data={question.data as IQuestionReportScaleData}/>;
        default:
            return undefined;
    }
}
