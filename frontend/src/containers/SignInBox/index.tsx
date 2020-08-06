import React from "react";
import { Grid, Header, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { IAuthData } from "models/IAuthData";
import {loginRoutine} from "./routines";
// import Logo from 'src/components/Logo';

interface ILoginProps {
  login: (data: IAuthData) => void;
  isLoading: boolean;
}

const LoginPage: React.FC<ILoginProps> = ({
  login: signIn,
  isLoading
}) => {

  return (
    <Grid textAlign="center" verticalAlign="middle" className="fill">
      <Grid.Column style={{ maxWidth: 450 }}>
        {/* // to do add <Logo /> */}
        <Header as="h2" color="teal" textAlign="center">
          Login to your account
        </Header>
        <LoginForm login={ signIn } isLoading={ isLoading }  />
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

const mapStateToProps = rootState => ({
  isLoading: rootState.profile.isLoading
});

const mapDispatchToProps = {
    login: loginRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
