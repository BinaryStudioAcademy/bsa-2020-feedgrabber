import React, {FC} from "react";
import styles from "./styles.module.sass";

export interface IUIButtonProps {
  title: string;
  center?: boolean;
  onClick?(): void;
}

const UIButton: FC<IUIButtonProps> = ({title, center, onClick}) => {
  return (
    <button className={`${styles.uiButton} ${center && styles.uiButtonCenter}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default UIButton;
