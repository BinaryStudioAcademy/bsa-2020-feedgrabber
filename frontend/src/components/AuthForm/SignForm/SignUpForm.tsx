import React, {FC} from 'react';
import Typography from './Typography';
import Input from './Input';
import Button from './Button';
import {Formik} from "formik";
import * as yup from "yup";
import {registerRoutine} from "../routines";
import {connect} from "react-redux";
import {IRegisterData} from "../../../models/auth/types";
import {Message} from "semantic-ui-react";

interface IRegisterProps {
    signUp: (data: IRegisterData) => void;
    isLoading: boolean;
    className: string;
}

const schema = yup.object().shape({
    companyName: yup
        .string()
        .required("Company name required")
        .min(6, "Company name too short!")
        .max(20, "Company name too long!"),
    email: yup
        .string()
        .email("Email must be valid")
        .required("Email must be valid"),
    password: yup
        .string()
        .required("Password required")
        .min(6, "Password too short!")
        .max(30, "Password too long!"),
    username: yup
        .string()
        .required("Username required")
        .min(5, "Username too short!")
        .max(15, "Username too long!")
});

const SignUpForm: FC<IRegisterProps> = props => {
    const {signUp: register, className} = props;

    return (
        <Formik
            initialValues={{email: '', password: '', companyName: '', username: ''}}
            validationSchema={schema}
            onSubmit={values => {
                register({
                    email: values.email,
                    password: values.password,
                    companyName: values.companyName,
                    username: values.username
                });
            }
            }
        >
            {({
                  errors,
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit
              }) => {
                const errorText = errors.username || errors.email || errors.companyName || errors.password;

                return (
                    <form className={className} onSubmit={handleSubmit} autoComplete="off">
                        <Typography fontWeight="bold" variant="h4">Create Account</Typography>
                        <Typography variant="body2">or use your email for registration</Typography>
                        <Input name="username" placeholder="Username" value={values.username}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        <Input name="email" placeholder="Email" value={values.email}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        <Input name="companyName" placeholder="Company" value={values.companyName}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        <Input name="password" type="password" placeholder="Password" value={values.password}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        {
                            errorText && <Message attached="top" error size="small" content={errorText}/>
                        }
                        <Button disabled={!!errorText}
                                variant="secondary"
                                type="submit"
                                marginTop="1.17rem">
                            Sign Up
                        </Button>
                    </form>);}}
        </Formik>
    );
};

const mapStateToProps = rootState => ({
    isLoading: rootState.profile.isLoading
});

const mapDispatchToProps = {
    signUp: registerRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
