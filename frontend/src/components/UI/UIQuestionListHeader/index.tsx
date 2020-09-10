import React, {FC} from "react";
import styles from "./styles.module.scss";
import UISection from "../UISectionCard";
import UIBackgroundWrapper from "../UIBackgroundWrapper";

export interface IUIListHeaderProps {
    title: string;
    description: string;
}

const UIListHeader: FC<IUIListHeaderProps> = ({title, description}) => {
    return (
        <div className={styles.headerContainer}>

                <UISection ti={title} d={description}>

                </UISection>
        </div>
        );
};

export default UIListHeader;
