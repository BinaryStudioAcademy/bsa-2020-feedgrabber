import React, {FC} from "react";
import styles from "./styles.module.sass";

export interface IUIPageTitleProps {
  title: string;
}

const UIPageTitle: FC<IUIPageTitleProps> = ({title}) => {
  return (
    <div className={styles.pageTitleWrapper}>
      <h2 className={styles.pageTitle}>{title}</h2>
    </div>
  );
};

export default UIPageTitle;
