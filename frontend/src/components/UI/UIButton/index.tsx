import React, { FC } from "react";
import styles from "./styles.module.sass";

export interface IUIButtonProps {
  title: string;
  disabled?: boolean;
  onClick?(): void;
}

const UIButton: FC<IUIButtonProps> = ({ title, onClick, disabled }) => {
  return (
    <button className={styles.uiButton} disabled={disabled} onClick={onClick}>
      {title}
    </button>
  );
};

export default UIButton;
