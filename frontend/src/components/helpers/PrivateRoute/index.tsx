import React, {useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from '../../../security/authProvider';
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import styles from './styles.module.sass';
import {connect} from "react-redux";
import {toggleMenuRoutine} from "../../../sagas/app/routines";
import AccessManager from "../AccessManager";
import {useTranslation} from "react-i18next";
import {getUserSettingsRoutine} from "../../../sagas/user/routines";
import {IAppState} from "../../../models/IAppState";

const PrivateRoute = ({
                          component: Component, showMenu, toggleMenu,
                          getSettings, user, roles = null, ...rest
                      }) => {
    const isLogged = useAuth();
    const {i18n} = useTranslation();

    const path = rest.path;

    useEffect(() => {
        if (isLogged && !user.settings) {
            getSettings();
        }
    }, [isLogged, getSettings, user.settings]);

    useEffect(() => {
        if (i18n.language !== user.settings?.language) {
            i18n.changeLanguage(user.settings.language);
        }
    }, [i18n, user.settings]);

    return (
        <Route
            {...rest}
            render={props => (
                !isLogged ?
                    <Redirect to={{pathname: '/auth', state: {from: props.location}}}/>
                    :
                    <AccessManager endpoint={path} onDenied={() => <Redirect to="/error" />}>
                        <Header/>
                        <div className={styles.mainPage}>
                            <div className={styles.mainSideBar}>
                                <SideMenu expanded={showMenu} toggleMenu={toggleMenu}/>
                            </div>
                            <div className={styles.appContent} id="app-content">
                                <Component {...props} />
                            </div>
                        </div>
                    </AccessManager>)
            }
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
