import React, {FC} from "react";
import styles from "./styles.module.sass";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUIContentProps {
    className?: string;
}

const UIContent: FC<IUIContentProps> = ({children, className}) => {
    return (
        <div className={styles.pageContentWrapper}>
            <div className={className || styles.pageContent}>
                {children}
            </div>
        </div>
    );
};

export default UIContent;
