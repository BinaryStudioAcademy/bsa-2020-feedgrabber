import React, {FC} from "react";
import styles from "./styles.module.sass";

export interface IUIColumnProps {
  wide?: boolean;
}

const UIColumn: FC<IUIColumnProps> = ({children, wide}) => {
  return (
    <div className={wide ? styles.uiWideColumn : styles.uiColumn}>
      {children}
    </div>
  );
};

export default UIColumn;
