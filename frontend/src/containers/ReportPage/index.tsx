import React, {FC, useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";

import {IAppState} from 'models/IAppState';
import {loadReportRoutine} from "../../sagas/questionnaireReport/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import LoaderWrapper from "../../components/LoaderWrapper";
import {
  IQuestionReport,
  IQuestionReportCheckboxData,
  IQuestionReportFreeTextData,
  IQuestionReportMultichoiceData,
  IQuestionReportRadioData,
  IQuestionReportScaleData,
  IQuestionReportDateData, IQuestionReportFileData
} from "../../models/report/IReport";
import {QuestionType} from "../../models/forms/Questions/IQuesion";
import RadioQuestionReport from "./RadioQuestionReport";
import FreeTextQuestionReport from "./FreeTextQuestionReport";
import CheckboxQuestionReport from "./CheckboxQuestionReport";
import ScaleQuestionReport from "./ScaleQuestionReport";
import DateSelectionReport from "./DateSelectionReport";
import { FileQuestionReport } from './FileQuestionReport';

const ReportPage: FC<ConnectedReportPageProps & { match }> = (
    {
        report, isLoading, loadReport, match
    }
) => {
    useEffect(() => {
        loadReport(match.params.id);
    }, [loadReport, match.params.id]);

  const renderQuestionData = (question: IQuestionReport) => {
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
      // case QuestionType.multichoice:
      //   return <MultichoiceQuestionReport data={question.data as IQuestionReportMultichoiceData}/>;
      case QuestionType.scale:
        return <ScaleQuestionReport data={question.data as IQuestionReportScaleData}/>;
      default:
        return <div/>;
    }
  };

    return (
        <>
            <UIPageTitle title="Report"/>
            <UIContent>
                <LoaderWrapper loading={isLoading}>
                    <UIColumn>
                        {report?.questions && (
                            <UICard>
                                <UICardBlock>
                                    <h3>{report.questionnaireTitle}</h3>
                                </UICardBlock>
                                {report.questions.map(q => (
                                    <UICardBlock key={q.id}>
                                        <h4>{q.title}</h4>
                                        <p><b>{q.answers} answers</b></p>
                                        {renderQuestionData(q)}
                                    </UICardBlock>
                                ))}
                            </UICard>
                        )}
                    </UIColumn>
                </LoaderWrapper>
            </UIContent>
        </>
    );
};

const mapStateToProps = (rootState: IAppState) => ({
    report: rootState.questionnaireReports.current,
    isLoading: rootState.questionnaireReports.isLoading
});

const mapDispatchToProps = {
    loadReport: loadReportRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectedReportPageProps = ConnectedProps<typeof connector>;

export default connector(ReportPage);
