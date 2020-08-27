import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from '../../security/authProvider';
import Header from "../Header";
import SideMenu from "../SideMenu";
import styles from './styles.module.sass';
import {connect} from "react-redux";
import {toggleMenuRoutine} from "../../sagas/app/routines";
import AccessManager from "../AccessManager";

const PrivateRoute = ({component: Component, showMenu, toggleMenu, roles = null, ...rest}) => {
    const isLogged = useAuth();
    const path = rest.path;

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

const mapStateToProps = state => ({
    showMenu: state.app.showMenu
});

const mapDispatchToProps = {
    toggleMenu: toggleMenuRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
