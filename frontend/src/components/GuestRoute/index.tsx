import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from '../../security/authProvider';

const GuestRoute = ({component: Component, ...rest}) => {
  const isLogged = useAuth();

  if (isLogged) return <Redirect to="/home"/>;

  return <Route {...rest} component={Component} />;
};

export default GuestRoute;
