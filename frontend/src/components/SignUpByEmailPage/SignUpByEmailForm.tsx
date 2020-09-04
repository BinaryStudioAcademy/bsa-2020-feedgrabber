import React, {FC} from 'react';
import Typography from '../AuthForm/SignForm/Typography';
import Input from '../AuthForm/SignForm/Input';
import Button from '../AuthForm/SignForm/Button';
import {Formik} from "formik";
import * as yup from "yup";
import {registerByEmailRoutine} from "../../sagas/auth/routines";
import {connect} from "react-redux";
import {Message} from "semantic-ui-react";
import {IAppState} from "../../models/IAppState";
import { ICompanyDomain } from 'models/companies/ICompanyDomain';

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Email must be valid")
        .required("Email must be valid"),
    password: yup
        .string()
        .required("Password required")
        .min(8, "Password too short!")
        .max(16, "Password too long!")
        .matches(/^\w[A-Za-z\d!#$%&'*+\-/=?^_`{}]+$/,
            "Password contains at least 8 characters ( letters, digits and !#$%&'*+-/=?^_`{} )"),
    passwordRepeat: yup
        .string()
        .required("Repeat password")
        .oneOf([yup.ref('password')], 'Passwords must match'),
    username: yup
        .string()
        .required("Username required")
        .min(3, "Username too short!")
        .max(20, "Username too long!")
        .matches(/^\w([A-Za-zА-Яа-я\d!#$%&'*+\-/=?^_`])([ ]?[A-Za-zА-Яа-я\d!#$%&'*+\-/=?^_`])*$/,
            "Username must be valid")
});

interface ISignUpFormProps {
    error: string;
    company: ICompanyDomain;
    signUp(action: {}): void;
}

const SignUpByEmailForm: FC<ISignUpFormProps & {className: string}> = props => {
    const {signUp, className, error, company} = props;

    return (
        <Formik
            initialValues={{email: '', password: '', companyName: '', username: '', passwordRepeat: ''}}
            validationSchema={schema}
            onSubmit={values => {
                signUp({
                    email: values.email,
                    password: values.password,
                    companyName: company.name,
                    username: values.username
                });
            }
            }
        >
            {({
                  touched,
                  errors,
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit
              }) => {
                const errorText = (touched.username && errors.username)
                    || (touched.email && errors.email)
                    || (touched.password && errors.password)
                    || (touched.passwordRepeat && errors.passwordRepeat)
                    || error;

                return (
                        <form className={className} onSubmit={handleSubmit} autoComplete="off">
                        <Typography fontWeight="bold" variant="h4">Create Account</Typography>
                        <Typography variant="body2">use your corporate email</Typography>
                        <Input name="username" placeholder="Username" value={values.username}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        <Input name="email" placeholder="Corporate email" value={values.email }
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Input name="password" type="password" placeholder="Password" value={values.password}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        <Input name="passwordRepeat" type="password"
                               placeholder="Confirm password" value={values.passwordRepeat}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        {
                            errorText && <Message attached="top" error size="tiny" content={errorText}/>
                        }
                        <Button disabled={!!errorText && errorText !== error}
                                variant="secondary"
                                type="submit"
                                marginTop="1.17rem">
                            Sign Up
                        </Button>
                    </form>
                    );}}
        </Formik>
    );
};

const mapState = (state: IAppState) => ({
    error: state.user.error?.register
});

const mapDispatch = {
    signUp: registerByEmailRoutine
};

export default connect(mapState, mapDispatch)(SignUpByEmailForm);

