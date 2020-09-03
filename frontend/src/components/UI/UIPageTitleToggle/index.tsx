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
}

const UIPageTitleToggle: FC<IUIPageTitleProps> = (
    {
        firstOption,
        firstOptionLink,
        secondOption,
        secondOptionLink
    }) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const secondOptionView = () => (
        <>
            <h2 className={styles.slash}>/</h2>
            <h2 className={`${styles.pageTitle} ${activeIndex === 1 ? styles.active : ""}`}
                onClick={() => {
                    setActiveIndex(1);
                    history.push(secondOptionLink);
                }}>{secondOption}</h2>
        </>
    );

    return (
        <div className={styles.pageTitleWrapper}>
            <h2 className={`${styles.pageTitle} ${activeIndex === 0 ? styles.active : ""}`}
                onClick={() => {
                    setActiveIndex(0);
                    history.push(firstOptionLink);
                }}>{firstOption}</h2>
            <AccessManager staticPermission={Permissions.blockUserAccount}>
                <h2 className={styles.slash}>/</h2>
                <h2 className={`${styles.pageTitle} ${activeIndex === 1 ? styles.active : ""}`}
                    onClick={() => {
                        setActiveIndex(1);
                        history.push(secondOptionLink);
                    }}>{secondOption}</h2>
            </AccessManager>
        </div>
    );
};

export default UIPageTitleToggle;
