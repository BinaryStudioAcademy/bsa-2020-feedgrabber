import React, {FC} from "react";
import styles from "./styles.module.sass";

export interface IUIPageTitle {
  title: string;
}

const UIPageTitle: FC<IUIPageTitle> = ({title}) => {
  return (
    <div className={styles.pageTitleWrapper}>
      <h2 className={styles.pageTitle}>{title}</h2>
    </div>
  );
};

export default UIPageTitle;
