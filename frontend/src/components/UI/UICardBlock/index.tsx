import React, {FC} from "react";
import styles from "./styles.module.sass";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUICardBlockProps {
}

const UICardBlock: FC<IUICardBlockProps> = ({children}) => {
  return (
    <div className={styles.uiCardBlock}>
      {children}
    </div>
  );
};

export default UICardBlock;
