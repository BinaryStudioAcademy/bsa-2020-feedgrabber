import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from '../../security/authProvider';
import Header from "../Header";

const fakeUser = {
    id: "",
    username: "user",
    avatar: "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png"
};

const PrivateRoute = ({component: Component, roles = null, ...rest}) => {
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
                        <Component {...props} />
                    </>
                );
            }}
        />
    );
};

export default PrivateRoute;
