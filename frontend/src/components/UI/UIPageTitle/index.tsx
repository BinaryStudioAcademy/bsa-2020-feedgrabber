import React, {FC} from "react";
import styles from "./styles.module.sass";

export interface IUIPageTitleProps {
  title: string;
}

const UIPageTitle: FC<IUIPageTitleProps> = ({title, children}) => {
  return (
    <div className={styles.pageTitleWrapper}>
      <h2 className={styles.pageTitle}>{title}</h2>
        {children}
    </div>
  );
};

export default UIPageTitle;
