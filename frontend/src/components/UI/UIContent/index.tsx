import React, {FC} from "react";
import styles from "./styles.module.sass";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUIContentProps {
}

const UIContent: FC<IUIContentProps> = ({children}) => {
  return (
    <div className={styles.pageContentWrapper}>
      <div className={styles.pageContent}>
        {children}
      </div>
    </div>
  );
};

export default UIContent;
