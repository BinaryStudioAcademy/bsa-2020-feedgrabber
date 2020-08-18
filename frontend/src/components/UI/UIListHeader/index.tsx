import React, {FC} from "react";
import styles from "./styles.module.scss";

export interface IUIListHeaderProps {
    title: string;
    description: string;
}

const UIListHeader: FC<IUIListHeaderProps> = ({title, description}) => {
    return (
        <div className={styles.headerContainer}>
                <div className="ui very padded segment">
                    <h1 className={styles.title}>{title}</h1>
                    {description? <h2 className={styles.description}>{description}</h2> : null}</div>
        </div>
        );
};

export default UIListHeader;