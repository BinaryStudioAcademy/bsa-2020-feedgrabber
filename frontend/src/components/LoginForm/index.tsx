import React from 'react';
import { Formik } from 'formik';
import { Form, Button, Segment } from 'semantic-ui-react';
import { IAuthData } from 'models/IAuthData';
import * as yup from 'yup';

interface ILoginFormProps {
  login(data: IAuthData): void;
  isLoading: boolean;
}

const validationScema = yup.object().shape({
  email: yup
   .string()
   .email()
   .required(),
  password: yup
    .string()
    .required()
    .min(6, "min 6 characters")
    .max(20, "max 20 characters.")
});
  
const LoginForm: React.FC<ILoginFormProps> = ({ login, isLoading }) => {
 
  return (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={validationScema}
    onSubmit={values =>
      login({ email: values.email, password: values.password })
    }
  >
    {({
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      touched
    }) => (
        <Form name="loginForm" size="large" onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              icon="at"
              iconPosition="left"
              placeholder="Email"
              type="email"
              name="email"
              error={touched.email && errors.email ? errors.email : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              error={touched.password && errors.password ? errors.password : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button type="submit" color="teal" fluid size="large" primary
                loading={isLoading} disabled={isLoading}>
              Login
            </Button>
          </Segment>
        </Form>
      )}
  </Formik>);
};

export default LoginForm;