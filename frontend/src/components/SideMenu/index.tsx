import React from 'react';
import {Icon} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

import styles from './styles.module.sass';

interface ISideMenuProps {
  expanded: boolean;

  toggleMenu(): void;
}

const SideMenu: React.FunctionComponent<ISideMenuProps> = ({expanded, toggleMenu}) => {
  return (
    <div className={`${styles.menuWrapper} ${expanded ? styles.menuWrapperOpen : styles.menuWrapperClosed}`}>
      <div className={styles.menuContent}>
        <NavLink exact to="/" className={styles.menuItem} activeClassName={styles.menuItemActive}>
          <Icon className={styles.menuItemIcon} size="big" name="home" />
          <span className={styles.menuItemTitle}>Home</span>
        </NavLink>
        <NavLink to="/company" className={styles.menuItem} activeClassName={styles.menuItemActive}>
          <Icon className={styles.menuItemIcon} size="big" name="columns" />
          <span className={styles.menuItemTitle}>Company Dashboard</span>
        </NavLink>
        <NavLink to="/questionnaires" className={styles.menuItem} activeClassName={styles.menuItemActive}>
          <Icon className={styles.menuItemIcon} size="big" name="list alternate outline" />
          <span className={styles.menuItemTitle}>Questionnaires</span>
        </NavLink>
        <NavLink to="/teams" className={styles.menuItem} activeClassName={styles.menuItemActive}>
          <Icon className={styles.menuItemIcon} size="big" name="users" />
          <span className={styles.menuItemTitle}>Teams</span>
        </NavLink>
        <NavLink to="/questions" className={styles.menuItem} activeClassName={styles.menuItemActive}>
          <Icon className={styles.menuItemIcon} size="big" name="question circle outline" />
          <span className={styles.menuItemTitle}>Questions</span>
        </NavLink>
        <NavLink to="/employees" className={styles.menuItem} activeClassName={styles.menuItemActive}>
          <Icon className={styles.menuItemIcon} size="big" name="user outline" />
          <span className={styles.menuItemTitle}>Employees</span>
        </NavLink>
        <NavLink to="/invitations" className={styles.menuItem} activeClassName={styles.menuItemActive}>
          <Icon className={styles.menuItemIcon} size="big" name="pin" />
          <span className={styles.menuItemTitle}>Invitations</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SideMenu;
