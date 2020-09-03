import React, {FC} from "react";
import styles from "./styles.module.sass";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUIButtonProps {
    searched?: boolean;
}

const UICard: FC<IUIButtonProps> = ({children, searched}) => {
    return (
        <div className={`${styles.uiCard} ${searched && styles.searched}`}>
            {children}
        </div>
    );
};

export default UICard;
