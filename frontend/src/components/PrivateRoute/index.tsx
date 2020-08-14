import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from '../../security/authProvider';
import Header from "../Header";
import SideMenu from "../SideMenu";
import styles from './styles.module.sass';
import {connect} from "react-redux";

const PrivateRoute = ({component: Component, showMenu, roles = null, ...rest}) => {
    const isLogged = useAuth();

    return (
        <Route
            {...rest}
            render={props => {
                if (!isLogged) {
                    return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>;
                }

                return (
                    <>
                        <Header />
                        <div className={styles.viewContainer}>
                            {showMenu && (
                                <div className={styles.sideBar}>
                                    <SideMenu/>
                                </div>
                            )}
                            <div className={styles.appContent}>
                                <Component {...props} />
                            </div>
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

export default connect(mapStateToProps, null)(PrivateRoute);
