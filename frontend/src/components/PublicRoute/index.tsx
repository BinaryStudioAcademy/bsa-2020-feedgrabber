import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        // get token
        const token = false;
        // if token exist then user already logged into account
        if (token) {
            return (
                <Redirect
                    to={{ pathname: '/', state: { from: props.location } }}
                />
            );
        }
        return <Component props />;
    }} />
);

export default PublicRoute;