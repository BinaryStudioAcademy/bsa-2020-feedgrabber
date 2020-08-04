import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import validator from 'validator';
import { Form, Button, Segment } from 'semantic-ui-react';
import { IAuthData } from 'models/IAuthData';
import { ISignInErrors } from 'models/ISignInErrors';

interface ILoginFormProps {
  login(data: IAuthData): void;
  setValidationErrors(errors: ISignInErrors): void;
  errors: ISignInErrors;
  isLoading: boolean;
}

const LoginForm: React.FC<ILoginFormProps> = ({ login, setValidationErrors, errors, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailChanged = (value: string) => {
    setEmail(value);
    const updError = ({
      ...errors,
      email: undefined
    });
    setValidationErrors(updError);
  };

  const passwordChanged = (value: string) => {
    setPassword(value);
    const updError = ({
      ...errors,
      password: undefined
    });
    setValidationErrors(updError);
  };

  const validateEmail = (): boolean => {
    if (!email) {
      const updError = ({
        ...errors,
        email: 'Please enter a valid Email'
      });
      setValidationErrors(updError);
      return false;
    }
    return true;
  };

  const validatePwd = () => {
    if (!password) {
      const updError = ({
        ...errors,
        password: 'this field is required'
      });
      setValidationErrors(updError);
      return false;
    }
    return true;
  };

  const handleLoginClick = async () => {
    const isValid = validateEmail() && validatePwd();
    if (!isValid || isLoading) {
      return;
    }
    login({ email, password });
  };

  return (
    <Form name="loginForm" size="large" onSubmit={handleLoginClick}>
      <Segment>
        <Form.Input
          fluid
          icon="at"
          iconPosition="left"
          placeholder="Email"
          type="email"
          error={errors.email}
          onChange={ev => emailChanged(ev.target.value)}
          onBlur={validateEmail}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          error={errors.password}
          onChange={ev => passwordChanged(ev.target.value)}
          onBlur={validatePwd}
        />
        <Button type="submit" color="teal" fluid size="large" loading={isLoading} primary>
          Login
        </Button>
      </Segment>
    </Form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  setValidationErrors: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired
};

export default LoginForm;
