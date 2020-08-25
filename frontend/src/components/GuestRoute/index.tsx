import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from '../../security/authProvider';

const GuestRoute = ({component: Component, ...rest}) => {
  const isLogged = useAuth();

  if (isLogged) return <Redirect to="/"/>;

  return <Route {...rest} component={Component} />;
};

export default GuestRoute;
