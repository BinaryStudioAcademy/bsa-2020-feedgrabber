import React from 'react';
import { IQuestionReportDateSelection } from "../../../models/report/IReport";

import styles from './styles.module.sass';

export interface IDateSelectionReportProps {
  dates?: IQuestionReportDateSelection;
}

const datesMock ={
  options: [
    { title: '2001-07-10', amount: 40 },
    { title: '2002-11-21', amount: 15 },
    { title: '2005-06-06', amount: 1 },
    { title: '1971-10-27', amount: 2 },
    { title: '1980-04-2', amount: 1 }
  ]
} as IQuestionReportDateSelection;

const DateSelectionReport: React.FC<IDateSelectionReportProps> = ({ dates= datesMock }) => {
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
      {getLabels(sortDates(dates.options))}
    </div>
  );
};

export default DateSelectionReport;
