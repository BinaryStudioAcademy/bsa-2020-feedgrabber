import React, {FC} from "react";
import styles from "./styles.module.sass";

export interface IUIButtonProps {
  title: string;
  center?: boolean;
  secondary?: boolean;

  onClick?(): void;
}

const UIButton: FC<IUIButtonProps> = ({title, center, secondary, onClick}) => {
  return (
    <button
      className={`${styles.uiButton} ${center && styles.uiButtonCenter} ${secondary && styles.uiButtonSecondary}`}
      onClick={onClick}>
      {title}
    </button>
  );
};

export default UIButton;
