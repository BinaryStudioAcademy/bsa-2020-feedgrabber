import React, {FC} from "react";
import {IQuestionReportRadioData} from "../../../models/report/IReport";
import PieChartTemplate from "../../../components/ReportTemplates/PieChartTemplate";

export interface IRadioQuestionReportProps {
  data: IQuestionReportRadioData;
}

const RadioQuestionReport: FC<IRadioQuestionReportProps> = ({data}) => {

  const getRandomColor = () => {
    return "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
  };

  return <PieChartTemplate
    data={data.options.map(o => o.amount)}
    labels={data.options.map(o => o.title)}
    backgroundColor={data.options.map(o => getRandomColor())}
  />;
};

export default RadioQuestionReport;
