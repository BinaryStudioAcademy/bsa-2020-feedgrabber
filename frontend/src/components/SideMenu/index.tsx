import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from './styles.module.sass';
import {Permissions} from "../helpers/AccessManager/rbac-rules";
import AccessManager from "../helpers/AccessManager";
import {useTranslation} from "react-i18next";
import {RiDashboardLine, RiHome2Line, RiListSettingsLine, RiTeamLine} from "react-icons/ri";
import {AiOutlineQuestion} from "react-icons/ai";

interface ISideMenuProps {
    expanded: boolean;

    toggleMenu(): void;
}

const SideMenu: React.FunctionComponent<ISideMenuProps> = ({expanded}) => {
    const [t] = useTranslation();
    return (
        <div className={`${styles.menuWrapper} ${expanded ? styles.menuWrapperOpen : styles.menuWrapperClosed}`}>
            <div className={styles.menuContent}>
                <NavLink exact to="/home" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                    <RiHome2Line size="1.3em" color="white" className={styles.menuItemIcon}/>
                    <span className={styles.menuItemTitle}>{t("Home")}</span>
                </NavLink>
                <NavLink to="/company" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                    <RiDashboardLine size="1.3em" color="white" className={styles.menuItemIcon}/>
                    <span className={styles.menuItemTitle}>{t("Company Dashboard")}</span>
                </NavLink>
                <AccessManager staticPermission={Permissions.managingQuestionnaires}>
                    <NavLink to="/questionnaires" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                        <RiListSettingsLine size="1.3em" color="white" className={styles.menuItemIcon}/>
                        <span className={styles.menuItemTitle}>{t("Questionnaires")}</span>
                    </NavLink>
                </AccessManager>
                <NavLink to="/people" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                    <RiTeamLine size="1.3em" className={styles.menuItemIcon} color="white"/>
                    <span className={styles.menuItemTitle}>{t("People")}</span>
                </NavLink>
                <AccessManager staticPermission={Permissions.managingQuestions}>
                    <NavLink to="/questions" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                        <AiOutlineQuestion className={styles.menuItemIcon} size="1.3em" color="white"/>
                        <span className={styles.menuItemTitle}>{t("Questions")}</span>
                    </NavLink>
                </AccessManager>
            </div>
        </div>
    );
};

export default SideMenu;
