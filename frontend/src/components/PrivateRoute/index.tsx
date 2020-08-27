import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from '../../security/authProvider';
import Header from "../Header";
import SideMenu from "../SideMenu";
import styles from './styles.module.sass';
import {connect} from "react-redux";
import {toggleMenuRoutine} from "../../sagas/app/routines";

const PrivateRoute = ({component: Component, showMenu, toggleMenu, roles = null, ...rest}) => {
    const isLogged = useAuth();

    return (
        <Route
            {...rest}
            render={props => {
                if (!isLogged) {
                    return <Redirect to={{pathname: '/auth', state: {from: props.location}}}/>;
                }

                return (
                    <>
                        <Header/>
                        <div className={styles.sideBarWrapper}>
                            <SideMenu expanded={showMenu} toggleMenu={toggleMenu}/>
                        </div>
                        <div className={styles.appContent}>
                            <Component {...props} />
                        </div>
                    </>
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
