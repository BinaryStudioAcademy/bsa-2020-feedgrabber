import React, {FC} from "react";
import styles from "./styles.module.sass";

export interface IUIPageTitleProps {
  title: string;
  search?: JSX.Element;
}

const UIPageTitle: FC<IUIPageTitleProps> = ({title, search}) => {
  return (
    <div className={styles.pageTitleWrapper}>
      <h2 className={styles.pageTitle}>{title}</h2>
      {search}
    </div>
  );
};

export default UIPageTitle;
