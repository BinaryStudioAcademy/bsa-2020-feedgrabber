import React, {FC} from "react";
import {Bar} from 'react-chartjs-2';

export interface IBarsChartTemplateProps {
  data: number[];
  labels: string[];
  backgroundColor: string[];
}

const BarsChartTemplate: FC<IBarsChartTemplateProps> = ({data, labels, backgroundColor}) => {
  return (
    <div>
      <div>
        <Bar
          data={{datasets: [{data, backgroundColor}], labels}}
          options={{legend: {display: false}, scales: {yAxes: [{ticks: {beginAtZero: true}}]}}}
          height={200}
        />
      </div>
    </div>
  );
};

export default BarsChartTemplate;
