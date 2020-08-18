import React, {FC} from "react";
import {PieChart} from "react-minimal-pie-chart";

import styles from './styles.module.sass';
import {Data} from "react-minimal-pie-chart/types/commonTypes";

export interface IPieChartTemplateProps {
  data: Data;
}

const PieChartTemplate: FC<IPieChartTemplateProps> = ({data}) => {
  return (
    <div>
      <div className={styles.pieChartContainer}>
        <PieChart
          data={data}
          animationEasing="ease-out"
          center={[50, 50]}
          lengthAngle={360}
          startAngle={0}
        />
      </div>
      <div className={styles.legendContainer}>
        {data.map(o => (
          <div className={styles.legendItem}>
            <div className={styles.legendItemColor} style={{ backgroundColor: o.color }} />
            <div className={styles.legendItemValue}>{o.value}</div>
            <div className={styles.legendItemTitle}>{o.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartTemplate;
