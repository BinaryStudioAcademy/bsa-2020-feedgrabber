import React, {FC} from "react";
import {IQuestionReportRadioData} from "../../../models/report/IReport";
import PieChartTemplate from "../../../components/ReportTemplates/PieChartTemplate";
import {getRandomColor} from "../../../helpers/colors.helper";

export interface IRadioQuestionReportProps {
  data: IQuestionReportRadioData;
}

const RadioQuestionReport: FC<IRadioQuestionReportProps> = ({data}) => {
  return <PieChartTemplate
    data={data.options.map(o => o.amount)}
    labels={data.options.map(o => o.title)}
    backgroundColor={data.options.map(o => getRandomColor())}
  />;
};

export default RadioQuestionReport;
