import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} component={Component} />
);

export default PublicRoute;
