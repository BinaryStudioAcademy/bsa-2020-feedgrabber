import React, {FC} from 'react';
import Typography from './Typography';
import Input from './Input';
import Button from './Button';
import * as yup from "yup";
import {Formik} from 'formik';
import {loginRoutine} from 'components/AuthForm/routines';
import {connect} from 'react-redux';
import {ILoginData} from "../../../models/auth/types";
import {Message} from "semantic-ui-react";

interface ILoginProps {
    signIn: (data: ILoginData) => void;
    isLoading: boolean;
    className: string;
}

const schema = yup.object().shape({
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

const SignInForm: FC<ILoginProps> = props => {
    const {signIn: login, className} = props;

    return (
        <Formik
            initialValues={{password: '', username: ''}}
            validationSchema={schema}
            onSubmit={values => {
                login({
                    password: values.password,
                    username: values.username
                });
            }
            }
        >
            {({
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit
              }) => {
                const errorText = errors.username || errors.password;

                return (
                    <form className={className} onSubmit={handleSubmit} autoComplete="off">
                        <Typography fontWeight="bold" variant="h4">Sign In</Typography>
                        <Typography variant="body2">or use your account</Typography>
                        <Input name="username" placeholder="Username" value={values.username}
                               onChange={handleChange}
                               onBlur={handleBlur}
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
                            Sign In
                        </Button>
                    </form>);}}
        </Formik>
    );
};

const mapStateToProps = rootState => ({
    isLoading: rootState.profile.isLoading
});

const mapDispatchToProps = {
    signIn: loginRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
