import React from "react";
import { Grid, Header, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';

import { login, setValidationErrorsAction } from './actions';
import { ISignInErrors } from "models/ISignInErrors";
import { IAuthData } from "models/IAuthData";
// import Logo from 'src/components/Logo';

interface ILoginProps {
  login(data: IAuthData): void;
  setValidationErrors(errors: ISignInErrors): void;
  validationErrors: ISignInErrors;
  isLoading: boolean;
}

const LoginPage: React.FC<ILoginProps> = ({
  login: signIn,
  setValidationErrors: setErrors,
  validationErrors,
  isLoading
}) => {
  return (
    <Grid textAlign="center" verticalAlign="middle" className="fill">
      <Grid.Column style={{ maxWidth: 450 }}>
        {/* <Logo /> */}
        <Header as="h2" color="teal" textAlign="center">
          Login to your account
        </Header>
        <LoginForm 
          login={signIn}
          errors={validationErrors}
          setValidationErrors={setErrors}
          isLoading={isLoading}
          />
        <Message>
          New to us?
          {' '}
          <NavLink exact to="/registration">Sign Up</NavLink>
        </Message>
        <Message>
          <NavLink exact to="/forgot_password">forgot password?</NavLink>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

LoginPage.defaultProps = {
  validationErrors: {}
};

const mapStateToProps = rootState => ({
  validationErrors: rootState.profile.validationErrors,
  isLoading: rootState.profile.isLoading
});

const actions = { login, setValidationErrors: setValidationErrorsAction };

export default connect(
  mapStateToProps,
  actions
)(LoginPage);
