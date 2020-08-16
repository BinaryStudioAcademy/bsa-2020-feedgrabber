import React, {FC} from "react";
import styles from "./styles.module.sass";
import LoaderWrapper from "../../LoaderWrapper";

export interface IUIButtonProps {
  title: string;
  center?: boolean;
  primary?: boolean;
  secondary?: boolean;
  submit?: boolean;
  loading?: boolean;

  onClick?(): void;
}

const UIButton: FC<IUIButtonProps> = (
  {
    title,
    center,
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
      onClick={() => {
        if (!loading) onClick();
      }}
      type={submit && !loading ? "submit" : "button"}
    >
      {loading ? "..." : title}
    </button>
  );
};

export default UIButton;
