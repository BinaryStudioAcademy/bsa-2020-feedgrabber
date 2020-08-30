import React, {FC} from 'react';
import ProfileInfo from "./ProfileInfo";
import ProfileSettings from "./ProfileSettings";
import ProfileSecurity from "./ProfileSecurity";
import styles from './styles.module.sass';
import UIPageTitle from "../UI/UIPageTitle";
import UICard from "../UI/UICard";
import UIBackgroundWrapper from "../UI/UIBackgroundWrapper";
import {history} from "../../helpers/history.helper";

type IProfileMode = { mode: 'profile' | 'settings' | 'security' }

const getPage = (key: string) => {
  switch (key) {
    case 'profile' :
      return <ProfileInfo/>;
    case 'settings':
      return <ProfileSettings/>;
    case 'security':
      return <ProfileSecurity/>;
    default:
      return <ProfileInfo/>;
  }
};

const getPageTitle = (key: string) => {
  switch (key) {
    case 'profile' :
      return 'My Profile';
    case 'settings':
      return 'My settings';
    case 'security':
      return 'Privacy and Security';
    default:
      return key;
  }
};

const Profile: FC<IProfileMode> =
    ({mode}) => {

      return (<>
        <UIPageTitle title={getPageTitle(mode)}/>
        <UIBackgroundWrapper>
          <div className={styles.profileContainer}>
            <div className={styles.menu}>
              <div className={[styles.menuItem, mode === 'profile' && styles.selected].join(' ')}
                   onClick={() => history.push('/profile')}>Profile
              </div>
              <div className={[styles.menuItem, mode === 'security' && styles.selected].join(' ')}
                   onClick={() => history.push('/profile/security')}>Privacy and Security
              </div>
              <div className={[styles.menuItem, mode === 'settings' && styles.selected].join(' ')}
                   onClick={() => history.push('/profile/settings')}>Settings
              </div>
            </div>
            <UICard>
              <div className={styles.contentContainer}>
                {getPage(mode)}
              </div>
            </UICard>
          </div>
        </UIBackgroundWrapper>
      </>);
    };

export default Profile;

