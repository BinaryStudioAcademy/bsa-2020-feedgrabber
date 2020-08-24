import React, { FC } from "react";
import { Doughnut } from 'react-chartjs-2';

import styles from './styles.module.sass';

export interface IPieChartTemplateProps {
  data: number[];
  labels: string[];
  backgroundColor: string[];
  options?: any;
}

const PieChartTemplate: FC<IPieChartTemplateProps> = ({ data, labels, backgroundColor, options }) => {
  return (
    <div>
      <div className={styles.pieChartContainer}>
        <Doughnut data={{ datasets: [{ data, backgroundColor }], labels }} options={options} width={100} />
      </div>
    </div>
  );
};

export default PieChartTemplate;
