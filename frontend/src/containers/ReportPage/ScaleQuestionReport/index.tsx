import React, {FC} from "react";
import {IQuestionReportScaleData} from "../../../models/report/IReport";
import BarsChartTemplate from "../../../components/ReportTemplates/BarsChartTemplate";

export interface IScaleQuestionReportProps {
  data: IQuestionReportScaleData;
}

const ScaleQuestionReport: FC<IScaleQuestionReportProps> = ({data}) => {

  const getRandomColor = () => {
    return "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
  };

  return <BarsChartTemplate
    data={data.options.map(o => o.amount)}
    labels={data.options.map(o => o.title)}
    backgroundColor={data.options.map(o => getRandomColor())}
  />;
};

export default ScaleQuestionReport;
