import React, { useState } from 'react';
// import validator from 'validator';
import { Form, Button, Segment } from 'semantic-ui-react';
import { IAuthData } from 'models/IAuthData';

interface ILoginFormProps {
  login(data: IAuthData): void;
  isLoading: boolean;
}

const LoginForm: React.FC<ILoginFormProps> = ({ login, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined)
  
  const emailChanged = (value: string) => {
    setEmail(value);
    setEmailError(undefined);
  };

  const passwordChanged = (value: string) => {
    setPassword(value);
    setPasswordError(undefined);
  };

  const validateEmail = (): boolean => {
    if (!email) {
      setEmailError('Please enter a valid Email');
      return false;
    }
    return true;
  };

  const validatePwd = () => {
    if (!password) {
      setPasswordError('this field is required');
      return false;
    }
    return true;
  };

  const handleLoginClick = () => {
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
          error={emailError}
          onChange={ev => emailChanged(ev.target.value)}
          onBlur={validateEmail}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          error={passwordError}
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

export default LoginForm;
