import React from 'react';
import { IQuestionReportDateData } from "../../../models/report/IReport";

import styles from './styles.module.sass';

export interface IDateSelectionReportProps {
  data?: IQuestionReportDateData;
}

const DateSelectionReport: React.FC<IDateSelectionReportProps> = ({ data }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const sortDates = (data: { title: string; amount: number }[]): { title: string; amount: number }[] => {
    return data.sort((a, b) => {
      if (a.title === b.title) {
        return 0;
      }
      return a.title > b.title ? 1 : -1;
    });
  };

  const getLabels = (dates: { title: string; amount: number }[]) => {
    const result = [];
    for (const date of dates) {
      const d = new Date(date.title);
      result.push(
        <div className={styles.date_selection_report_date}>
            {monthNames[d.getMonth()] + ' ' + d.getFullYear()}
        </div>);
      result.push(
        <div className={styles.date_amount}>
          <div>
            <span>{d.getDate()}</span>
            {date.amount > 1 && (
              <div className={styles.date_report_date_amount}>
                {date.amount}
              </div>
            )}
          </div>
        </div>);
    }
    return result;
  };

  return (
    <div className={styles.date_report}>
      {getLabels(sortDates(data.options))}
    </div>
  );
};

export default DateSelectionReport;
