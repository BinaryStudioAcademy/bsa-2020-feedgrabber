import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from './styles.module.sass';
import {Permissions} from "../AccessManager/rbac-rules";
import AccessManager from "../AccessManager";
import {RiDashboardLine, RiHome2Line, RiListSettingsLine, RiTeamLine} from "react-icons/ri";
import {AiOutlineQuestion} from "react-icons/ai";

interface ISideMenuProps {
    expanded: boolean;

    toggleMenu(): void;
}

const SideMenu: React.FunctionComponent<ISideMenuProps> = ({expanded, toggleMenu}) => {
    return (
        <div className={`${styles.menuWrapper} ${expanded ? styles.menuWrapperOpen : styles.menuWrapperClosed}`}>
            <div className={styles.menuContent}>
                <NavLink exact to="/" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                    <RiHome2Line size="1.3em" color="white" className={styles.menuItemIcon}/>
                    <span className={styles.menuItemTitle}>Home</span>
                </NavLink>
                <NavLink to="/company" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                    <RiDashboardLine size="1.3em" color="white" className={styles.menuItemIcon}/>
                    <span className={styles.menuItemTitle}>Company Dashboard</span>
                </NavLink>
                <AccessManager staticPermission={Permissions.managingQuestionnaires}>
                    <NavLink to="/questionnaires" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                        <RiListSettingsLine size="1.3em" color="white" className={styles.menuItemIcon}/>
                        <span className={styles.menuItemTitle}>Questionnaires</span>
                    </NavLink>
                </AccessManager>
                <NavLink to="/teams" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                    <RiTeamLine size="1.3em" className={styles.menuItemIcon} color="white"/>
                    <span className={styles.menuItemTitle}>Teams</span>
                </NavLink>
                <AccessManager staticPermission={Permissions.managingQuestions}>
                    <NavLink to="/questions" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                        <AiOutlineQuestion className={styles.menuItemIcon} size="1.3em" color="white"/>
                        <span className={styles.menuItemTitle}>Questions</span>
                    </NavLink>
                </AccessManager>
                <AccessManager staticPermission={Permissions.blockUserAccount}>
                    <NavLink to="/employees" className={styles.menuItem} activeClassName={styles.menuItemActive}>
                        <RiTeamLine className={styles.menuItemIcon} size="1.3em" color="white"/>
                        <span className={styles.menuItemTitle}>Employees</span>
                    </NavLink>
                </AccessManager>
            </div>
        </div>
    );
};

export default SideMenu;
