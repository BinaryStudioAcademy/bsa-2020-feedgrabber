import React, {useState, useEffect, FC} from 'react';
import { connect, ConnectedProps } from "react-redux";
import LoaderWrapper from "../../../components/LoaderWrapper";
import { IRespondentReport } from '../../../models/report/IReport';
import styles from "../styles.module.sass";
import { Header, Segment } from "semantic-ui-react";
import { IQuestion, QuestionType } from "../../../models/forms/Questions/IQuesion";
import { ScaleQuestionResponse } from "../../../components/ResponseQuestion/ScaleQuestionResponse";
import { DateSelectionResponse } from "../../../components/ResponseQuestion/DateSelectionResponse";
import RadioButtonResponse from "../../../components/ResponseQuestion/RadioButtonResponse";
import { CheckboxResponse } from "../../../components/ResponseQuestion/CheckboxResponse";
import { FreeTextResponse } from "../../../components/ResponseQuestion/FreeTextResponse";
import { loadRespondentReportRoutine } from "../../../sagas/report/routines";

const RespondentReport: FC<ConnectedReportPageProps & { match }> = ({
  match,
  respondentReport,
  isLoading,
  loadReport
}) => {
  const [report, setReport] = useState(respondentReport);
  console.log(respondentReport);
  console.log(match);

  useEffect(() => {
    console.log(match.params.respondent);
    loadReport(match.params.respondent);
  }, [match.params.respondent, loadReport]);

  return (
    <div>
      <LoaderWrapper loading={isLoading}>
        {respondentReport.answers &&
          renderUserReport(respondentReport)
        }
      </LoaderWrapper>
    </div>
  );
};

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

const mapStateToProps = rootState => ({
  respondentReport: rootState.questionnaireReports.currentUserReport,
  isLoading: rootState.questionnaireReports.isLoadingRespondentReports
});

const mapDispatchToProps = {
  loadReport: loadRespondentReportRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectedReportPageProps = ConnectedProps<typeof connector>;

export default connector(RespondentReport);
