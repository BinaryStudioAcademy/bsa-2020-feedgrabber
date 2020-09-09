import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

import styles from './styles.module.sass';
import {Permissions} from "../helpers/AccessManager/rbac-rules";
import AccessManager from "../helpers/AccessManager";
import {useTranslation} from "react-i18next";
import {
    RiDashboardLine,
    RiHome2Line,
    RiListSettingsLine,
    RiTeamLine,
    RiGlobalLine,
    RiArrowUpSLine,
    RiArrowDownSLine
} from "react-icons/ri";
import {AiOutlineQuestion} from "react-icons/ai";
import {IAppState} from "../../models/IAppState";
import {getUserSettingsRoutine, updateUserSettingsRoutine} from "../../sagas/user/routines";
import {connect, ConnectedProps} from "react-redux";
import {
  BiRadioCircle,
  BiRadioCircleMarked
} from "react-icons/all";
import {setExpandLanguageRoutine} from "../../sagas/app/routines";

const languages: {key: string; text: string; value: string}[] = [
  {
    key: 'English',
    text: 'English',
    value: 'english'
  },
  {
    key: 'Ukrainian',
    text: 'Українська',
    value: 'ukrainian'
  }
];

interface ISideMenuProps {
    expanded: boolean;
    expandLanguage: boolean;

    toggleMenu(): void;
    setExpandLanguage(isExpand: boolean): void;
}

const SideMenu: React.FunctionComponent<ISideMenuProps & ISideMenuConnectedProps> =
    ({expanded,
      expandLanguage,
      settings,
      getSettings,
      updateSettings,
      setExpandLanguage
    }) => {

    const [t, i18n] = useTranslation();
    useEffect(() => {
      !settings && getSettings();
    }, [getSettings, settings]);

    const handleLanguageChange = (value: string) => {
      updateSettings({...settings, language: value});
      i18n.changeLanguage(value);
    };
    const languageItem = lang => (
        <li className={styles.menuItem} key={lang.key} onClick={() => handleLanguageChange(lang.value)}>
          {settings?.language === lang.value
              ? <BiRadioCircleMarked size="1.3em" color="white" className={styles.menuItemIcon}/>
              : <BiRadioCircle size="1.3em" color="white" className={styles.menuItemIcon}/>
          }
          <span className={styles.menuItemTitle}>{lang.text}</span>
        </li>
    );

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

                <div className={styles.menuLanguagesWrapper} onClick={()=>setExpandLanguage(!expandLanguage)}>
                    <div className={styles.menuItem}>
                        <RiGlobalLine size="1.3em" color="white" className={styles.menuItemIcon}/>
                        <span className={styles.menuItemTitle}>{t("Language")}</span>
                        {expandLanguage
                          ? <RiArrowDownSLine size="1.3em" color="white"
                                              className={`${styles.menuItemIcon} ${styles.menuIconRight}`}/>
                          : <RiArrowUpSLine size="1.3em" color="white"
                                            className={`${styles.menuItemIcon} ${styles.menuIconRight}`}/>
                        }
                    </div>
                  <ul className={expandLanguage && expanded ? styles.listActive : styles.listInactive}>
                    {languages.map(lang => languageItem(lang))}
                  </ul>
                </div>

            </div>
        </div>
    );
};
const mapState = (state: IAppState) => ({
  settings: state.user.settings,
  expandLanguage: state.app.expandLanguage
});

const mapDispatchToProps = {
  getSettings: getUserSettingsRoutine,
  updateSettings: updateUserSettingsRoutine,
  setExpandLanguage: setExpandLanguageRoutine
};

const connector = connect(mapState, mapDispatchToProps);

type ISideMenuConnectedProps = ConnectedProps<typeof connector>;

export default connector(SideMenu);
