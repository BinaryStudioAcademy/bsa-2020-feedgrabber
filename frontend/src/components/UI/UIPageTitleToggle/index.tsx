import React, {FC, useState} from "react";
import styles from "./styles.module.sass";
import {Permissions} from "../../AccessManager/rbac-rules";
import {history} from "../../../helpers/history.helper";
import AccessManager from "../../AccessManager";

export interface IUIPageTitleProps {
    firstOption: string;
    firstOptionLink: string;
    secondOption: string;
    secondOptionLink: string;
    firstIsSelected: boolean;
}

const UIPageTitleToggle: FC<IUIPageTitleProps> = (
    {
        firstOption,
        firstOptionLink,
        secondOption,
        firstIsSelected,
        secondOptionLink
    }) => {

    const [selectedFirst, setFirstIsSelected] = useState(firstIsSelected);

    return (
        <div className={styles.pageTitleWrapper}>
            <h2 className={`${styles.pageTitle} ${selectedFirst ? styles.active : ""}`}
                onClick={() => {
                    setFirstIsSelected(true);
                    history.push(firstOptionLink);
                }}>{firstOption}</h2>
            <AccessManager staticPermission={Permissions.blockUserAccount}>
                <h2 className={styles.slash}>/</h2>
                <h2 className={`${styles.pageTitle} ${!selectedFirst ? styles.active : ""}`}
                    onClick={() => {
                        setFirstIsSelected(false);
                        history.push(secondOptionLink);
                    }}>{secondOption}</h2>
            </AccessManager>
        </div>
    );
};

export default UIPageTitleToggle;
