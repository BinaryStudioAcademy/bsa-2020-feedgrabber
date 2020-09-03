import React, {useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from '../../security/authProvider';
import Header from "../Header";
import SideMenu from "../SideMenu";
import styles from './styles.module.sass';
import {connect} from "react-redux";
import {toggleMenuRoutine} from "../../sagas/app/routines";
import AccessManager from "../AccessManager";
import {useTranslation} from "react-i18next";
import {getUserSettingsRoutine} from "../../sagas/user/routines";
import {IAppState} from "../../models/IAppState";

const PrivateRoute = ({component: Component, showMenu, toggleMenu,
                          getSettings, user, roles = null, ...rest}) => {
    const isLogged = useAuth();
    const path = rest.path;

    useEffect(() => {
        getSettings();
    }, [getSettings]);

    const { i18n } = useTranslation();
    if (i18n.language !== user.settings?.language) {
        i18n.changeLanguage(user.settings.language);
    }

    return (
        <Route
            {...rest}
            render={props => {
                if (!isLogged) {
                    return <Redirect to={{pathname: '/auth', state: {from: props.location}}}/>;
                }

                return (
                    <AccessManager endpoint={path}>
                        <Header/>
                        <div className={styles.sideBarWrapper}>
                            <SideMenu expanded={showMenu} toggleMenu={toggleMenu}/>
                        </div>
                        <div className={styles.appContent}>
                            <Component {...props} />
                        </div>
                    </AccessManager>
                );
            }}
        />
    );
};

const mapStateToProps = (state: IAppState) => ({
    user: state.user,
    showMenu: state.app.showMenu
});

const mapDispatchToProps = {
    getSettings: getUserSettingsRoutine,
    toggleMenu: toggleMenuRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
