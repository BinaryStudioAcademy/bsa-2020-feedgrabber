import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from '../../security/authProvider';
import Header from "../Header";
import SideMenu from "../SideMenu";
import './styles.sass';
import {connect} from "react-redux";

const fakeUser = {
    id: "",
    username: "user",
    avatar: "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png"
};

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
                        <Header user={fakeUser}/>
                        <div className="view-container">
                            {showMenu && (
                                <div className="side-bar">
                                    <SideMenu/>
                                </div>
                            )}
                            <div className="app-content">
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
