import PieChartTemplate from "components/ReportTemplates/PieChartTemplate";
import { getRandomColor } from "helpers/colors.helper";
import { IQuestionReportFileData } from "models/report/IReport";
import React, { FC } from "react";

export interface IFileQuestionReportProps {
    data: IQuestionReportFileData;
}

export const FileQuestionReport: FC<IFileQuestionReportProps> = ({ data }) => {
    return <PieChartTemplate
        data={data.options.map(o => o.amount)}
        labels={data.options.map(o => o.type)}
        options={{
            tooltips: {
                custom: function(tooltip) {
                    if (!tooltip) return;
                    tooltip.displayColors = false;
                  },
                callbacks: {
                    label: function (tooltipItem, chartData) {
                        const _data = chartData.datasets[tooltipItem.datasetIndex];
                        const type = chartData.labels[tooltipItem.index];
                        const initial = data.options.find(option => option.type === type);
                        return [`${type}: ${initial?.amount}`, `average size: ${Math.round(initial?.sizes
                            .reduce((o1, o2) => o2 += o1) / initial?.sizes.length)} Mb`];
                    }
                }
            }
        }}
        backgroundColor={data.options.map(o => getRandomColor())}
    />;
};