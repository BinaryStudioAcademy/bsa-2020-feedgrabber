import React, {FC} from "react";
import styles from "./styles.module.sass";

export interface IUIButtonProps {
    title: string;
    center?: boolean;
    primary?: boolean;
    secondary?: boolean;
    submit?: boolean;
    cancel?: boolean;
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
        cancel,
        onClick,
        loading
    }
) => {
    return (
        <button
            className={` 
                  ${center && styles.uiButtonCenter} 
                  ${secondary && styles.uiButtonSecondary}
                  ${submit && styles.submit}
                  ${cancel && styles.cancel}
                  ${primary && styles.uiButtonPrimary}
                  ${styles.uiButton}`}
            onClick={onClick}
            type={submit ? "submit" : "button"}
            disabled={disabled}
        >
            {loading ? "..." : title}
        </button>
    );
};

export default UIButton;
