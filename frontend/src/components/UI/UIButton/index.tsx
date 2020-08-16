import React, {FC} from "react";
import styles from "./styles.module.sass";

export interface IUIButtonProps {
  title: string;
  center?: boolean;
  primary?: boolean;
  secondary?: boolean;
  submit?: boolean;
  loading?: boolean;
  disabled?: boolean;

  onClick?(): void;
}

const UIButton: FC<IUIButtonProps> = (
  {
    title,
    center,
    disabled,
    secondary,
    primary,
    submit,
    onClick,
    loading
  }
) => {
  return (
    <button
      className={`${styles.uiButton} 
                  ${center && styles.uiButtonCenter} 
                  ${secondary && styles.uiButtonSecondary}
                  ${primary && styles.uiButtonPrimary}`}
      onClick={onClick}
      type={submit ? "submit" : "button"}
      disabled={disabled}
    >
      {loading ? "..." : title}
    </button>
  );
};

export default UIButton;
