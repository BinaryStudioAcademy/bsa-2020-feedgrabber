import React, {FunctionComponent} from 'react';
import {Icon} from 'semantic-ui-react';
import styles from './styles.module.sass';

const MainPageHeader: FunctionComponent = () => (
    <header className={[styles.primaryHeader, styles.headerContainer].join(' ')}>
        <a className={[styles.headerLogo, styles.headerItem, styles.centerContent].join(' ')}>
            logo
        </a>
        <div className={[styles.headerItem, styles.hoverBorder, styles.item1, styles.centerContent].join(' ')}>
            Pending Feedbacks
        </div>
        <div className={[styles.headerItem, styles.hoverBorder, styles.item2, styles.centerContent].join(' ')}>
            Form Editor
        </div>
        <div className={[styles.headerItem, styles.hoverBorder, styles.item3, styles.centerContent].join(' ')}>
            Assign Feedbacks
        </div>
        <div className={[styles.headerItem, styles.hoverBorder, styles.item4, styles.centerContent].join(' ')}>
            Dashboard
        </div>

        <div className={[styles.notificationsItem, styles.centerContent].join(' ')}>
            <Icon color='blue' name='bell' size='large'/>
        </div>

        <div className={styles.profileItem + ' ' + styles.centerContent}>
            <input className={styles.menuChecker} type='checkbox'/>
            <Icon color='blue' name='user circle' size='big'/>
            <div className={styles.menuOptions}>
                <ul className={styles.menuList}>
                    <li className={styles.menuHeader}>My Profile</li>
                    <a href='#'>
                        <li className={styles.menuOption}>Item1</li>
                    </a>
                    <a href='#'>
                        <li className={styles.menuOption}>Item 2</li>
                    </a>
                    <a href='#'>
                        <li className={styles.menuOption}>Item3</li>
                    </a>
                    <a href='#'>
                        <li className={styles.menuOption}>Item 4</li>
                    </a>
                </ul>
            </div>
        </div>
    </header>
)

export default MainPageHeader;