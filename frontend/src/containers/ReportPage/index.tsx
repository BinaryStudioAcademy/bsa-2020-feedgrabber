import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { IAppState } from 'models/IAppState';
import { loadReportRoutine, loadRespondentReportsRoutine } from "../../sagas/report/routines";
import UICardBlock from "../../components/UI/UICardBlock";
import LoaderWrapper from "../../components/LoaderWrapper";
import { Header, Segment, Tab, Label } from 'semantic-ui-react';
import { QuestionType } from "../../models/forms/Questions/IQuesion";
import {
  IQuestionReport,
  IQuestionReportCheckboxData,
  IQuestionReportDateData,
  IQuestionReportFileData,
  IQuestionReportFreeTextData,
  IQuestionReportRadioData,
  IQuestionReportScaleData,
  IRespondentReportPreview
} from "../../models/report/IReport";
import RadioQuestionReport from "./RadioQuestionReport";
import FreeTextQuestionReport from "./FreeTextQuestionReport";
import CheckboxQuestionReport from "./CheckboxQuestionReport";
import ScaleQuestionReport from "./ScaleQuestionReport";
import DateSelectionReport from "./DateSelectionReport";
import { FileQuestionReport } from './FileQuestionReport';
import { Link } from 'react-router-dom';
import styles from './styles.module.sass';
import { useTranslation } from 'react-i18next';
import UIContent from "../../components/UI/UIContent";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIColumn from "../../components/UI/UIColumn";

const ReportPage: FC<ConnectedReportPageProps & { match }> = (
  {
    match,
    report,
    isLoadingReport,
    responsesPreview,
    isLoadingUsersReports,
    loadReport,
    loadUsersReports
  }
) => {
  useEffect(() => {
    loadReport(match.params.id);
    loadUsersReports(match.params.id);
  }, [loadReport, match.params.id, loadUsersReports]);

  const [t] = useTranslation();

  const panes = [
    {
      menuItem: t('Overall'),
      render: () => (
        <Tab.Pane>
          <LoaderWrapper loading={isLoadingReport}>
            {report.questions && (
              <>
                <h3>{report.questionnaire.title}</h3>
                {
                  report.excelLink && report.powerPointLink &&
                  <div>
                    <Label as='a' color='blue' image className={styles.excel} href={report.excelLink.link}>
                      <img src='https://i.imgur.com/hUTbkcP.png' alt="" />
                      Excel {t("report")}
                    </Label>
                    <Label as='a' color='blue' image href={report.powerPointLink.link}>
                      <img src='https://i.imgur.com/fs4C1Yy.png' alt="" />
                      PowerPoint {t("report")}
                    </Label>
                  </div>
                }
                {report.questions.map(q => (
                  <UICardBlock key={q.id}>
                    <h3>{q.title}</h3>
                    <p>
                      <b>{q.answers} {t("answers")}</b>
                    </p>
                    {renderQuestionData(q)}
                  </UICardBlock>
                ))}
              </>
            )}
          </LoaderWrapper>
        </Tab.Pane>
      )
    },
    {
      menuItem: t('Respondents'),
      render: () => (
        <Tab.Pane>
          <LoaderWrapper loading={isLoadingUsersReports}>
            <div className={styles.respondent_reports_container}>
              {responsesPreview && responsesPreview.map(reportPreview =>
                renderUserReportPreview(reportPreview, match.params.id))}
            </div>
          </LoaderWrapper>
        </Tab.Pane>
      )
    }
  ];

  return (
    <>
      <UIPageTitle title={t("View Report Info")} />
      <br />
      <br />
      <UIContent>
        <UIColumn wide>
          <Tab panes={panes} />
        </UIColumn>
      </UIContent>
    </>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  report: rootState.questionnaireReports.currentFullReport,
  isLoadingReport: rootState.questionnaireReports.isLoading,
  currentUserReport: rootState.questionnaireReports.currentUserReport,
  responsesPreview: rootState.questionnaireReports.responsesPreview,
  isLoadingUsersReports: rootState.questionnaireReports.isLoadingPreviews
});

const mapDispatchToProps = {
  loadReport: loadReportRoutine,
  loadUsersReports: loadRespondentReportsRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectedReportPageProps = ConnectedProps<typeof connector>;

export default connector(ReportPage);

function renderUserReportPreview(userReport: IRespondentReportPreview, id: string) {
  return (
    <Link key={userReport.id} to={`/report/${id}/${userReport.id}/${userReport.username}`}
      className={styles.respondent_report_preview}>
      <Segment>
        <Header as="h4">{userReport.firstName} {userReport.lastName}</Header>
        <Header as="h4">{userReport.username}</Header>
        <span>{userReport.answeredAt}</span>
      </Segment>
    </Link>
  );
}

function renderQuestionData(question: IQuestionReport) {
  switch (question.type) {
    case QuestionType.radio:
      return <RadioQuestionReport data={question.data as IQuestionReportRadioData} />;
    case QuestionType.checkbox:
      return <CheckboxQuestionReport data={question.data as IQuestionReportCheckboxData} />;
    case QuestionType.date:
      return <DateSelectionReport data={question.data as IQuestionReportDateData} />;
    case QuestionType.fileUpload:
      return <FileQuestionReport data={question.data as IQuestionReportFileData} />;
    case QuestionType.freeText:
      return <FreeTextQuestionReport data={question.data as IQuestionReportFreeTextData} />;
    case QuestionType.scale:
      return <ScaleQuestionReport data={question.data as IQuestionReportScaleData} />;
    default:
      return undefined;
  }
}
