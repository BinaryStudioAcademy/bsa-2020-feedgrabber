import React, {FC} from "react";
import styles from "./styles.module.sass";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUIButtonProps {
}

const UICard: FC<IUIButtonProps> = ({children}) => {
  return (
    <div className={styles.uiCard}>
      {children}
    </div>
  );
};

export default UICard;
