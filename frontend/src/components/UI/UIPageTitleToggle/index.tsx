import React, {FC, useState} from "react";
import styles from "./styles.module.sass";
import {classNames} from "react-select/src/utils";

export interface IUIPageTitleProps {
    firstOption: string;
    secondOption: string;

    togglePanel(): void;
}

const UIPageTitleToggle: FC<IUIPageTitleProps> = ({firstOption, secondOption, togglePanel}) => {

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className={`${styles.pageTitleWrapper} ${activeIndex === 1 ? styles.titleReverse : ""}`}>
            <h2 className={`${styles.pageTitle} ${activeIndex === 0 ? styles.active : ""}`}
                onClick={() => setActiveIndex(0)}>{firstOption}</h2>
            <h2 className={styles.slash}>/</h2>
            <h2 className={`${styles.pageTitle} ${activeIndex === 1 ? styles.active : ""}`}
                onClick={() => setActiveIndex(1)}>{secondOption}</h2>
        </div>
    );
};

export default UIPageTitleToggle;
