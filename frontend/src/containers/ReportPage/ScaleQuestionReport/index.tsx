import React, {FC} from "react";
import {IQuestionReportScaleData} from "../../../models/report/IReport";
import BarsChartTemplate from "../../../components/ReportTemplates/BarsChartTemplate";
import {getRandomColor} from "../../../helpers/colors.helper";

export interface IScaleQuestionReportProps {
  data: IQuestionReportScaleData;
}

const ScaleQuestionReport: FC<IScaleQuestionReportProps> = ({data}) => {

  return <BarsChartTemplate
    data={data.options.map(o => o.amount)}
    labels={data.options.map(o => o.title)}
    backgroundColor={data.options.map(o => getRandomColor())}
  />;
};

export default ScaleQuestionReport;
