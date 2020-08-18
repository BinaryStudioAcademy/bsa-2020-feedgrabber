import React, {FC} from "react";
import {IQuestionReportRadioData} from "../../../models/report/IReport";
import PieChartTemplate from "../PieChartTemplate";

export interface IRadioQuestionReportProps {
  data: IQuestionReportRadioData;
}

const RadioQuestionReport: FC<IRadioQuestionReportProps> = ({data}) => {

  const getRandomColor = () => {
    return "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
  };

  const radioOptions = data.options.map(o => (
    {value: o.amount, title: o.title, color: getRandomColor()}
  ));

  return <PieChartTemplate data={radioOptions} />;
};

export default RadioQuestionReport;
