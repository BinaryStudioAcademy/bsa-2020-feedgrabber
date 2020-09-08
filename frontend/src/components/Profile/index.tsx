import React, {FC} from 'react';
import ProfileInfo from "./ProfileInfo";
import ProfileSettings from "./ProfileSettings";
import ProfileSecurity from "./ProfileSecurity";
import styles from './styles.module.sass';
import UIPageTitle from "../UI/UIPageTitle";
import UICard from "../UI/UICard";
import UIBackgroundWrapper from "../UI/UIBackgroundWrapper";
import {history} from "../../helpers/history.helper";
import {useTranslation} from "react-i18next";
import UIContent from "../UI/UIContent";
import LoaderWrapper from "../helpers/LoaderWrapper";
import {IAppState} from "../../models/IAppState";
import {connect} from "react-redux";

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

const Profile: FC<IProfileMode & {isLoading: boolean}> =
    ({mode, isLoading}) => {
        const [t] = useTranslation();
        return (<>
            <UIPageTitle title={t(getPageTitle(mode))}/>
            <UIContent>
                <UIBackgroundWrapper>
                    <div className={styles.profileContainer}>
                            <div className={styles.menu}>
                                <div className={[styles.menuItem, mode === 'profile' && styles.selected].join(' ')}
                                     onClick={() => history.push('/profile')}>{t("Profile")}
                                </div>
                                <div className={[styles.menuItem, mode === 'security' && styles.selected].join(' ')}
                                     onClick={() => history.push('/profile/security')}>{t("Privacy and Security")}
                                </div>
                            </div>
                        <LoaderWrapper loading={isLoading}>
                            <UICard>
                                <div className={styles.contentContainer}>
                                    {getPage(mode)}
                                </div>
                            </UICard>
                        </LoaderWrapper>
                    </div>
                </UIBackgroundWrapper>
            </UIContent>
        </>);
    };

export default connect((state: IAppState) => ({isLoading: state.user.isLoading}))(Profile);

