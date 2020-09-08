import React, {FC} from "react";
import styles from "./styles.module.sass";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUIButtonProps {
    searched?: boolean;
    customStyle?: string;
}

const UICard: FC<IUIButtonProps> = ({children, searched, customStyle}) => {
    return (
        <div className={`${styles.uiCard} ${customStyle} ${searched && styles.searched}`}>
            {children}
        </div>
    );
};

export default UICard;
