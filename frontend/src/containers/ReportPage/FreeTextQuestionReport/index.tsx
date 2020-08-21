import React, {FC} from "react";
import {IQuestionReportFreeTextData} from "../../../models/report/IReport";
import styles from './styles.module.sass';

export interface IFreeTextQuestionReportProps {
  data: IQuestionReportFreeTextData;
}

const FreeTextQuestionReport: FC<IFreeTextQuestionReportProps> = ({data}) => {
  return (
    <div className={styles.freeTextWrapper}>
      {data.values.map(v => <div className={styles.freeText}>{v}</div>)}
    </div>
  );
};

export default FreeTextQuestionReport;
