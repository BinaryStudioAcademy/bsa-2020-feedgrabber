import React, {FC} from 'react';
import Typography from './Typography';
import Input from './Input';
import Button from './Button';
import {Formik} from "formik";
import * as yup from "yup";
import {registerRoutine} from "../../../sagas/auth/routines";
import {connect, ConnectedProps} from "react-redux";
import {Message} from "semantic-ui-react";
import {IAppState} from "../../../models/IAppState";
import LoaderWrapper from 'components/LoaderWrapper';

const schema = yup.object().shape({
    companyName: yup
        .string()
        .required("Company name required")
        .min(2, "Company name too short!")
        .max(40, "Company name too long!")
        .matches(/^\w([A-Za-zА-Яа-я\d!#$%&'*+\-/=?^_`])([ ]?[A-Za-zА-Яа-я\d!#$%&'*+\-/=?^_`])*$/,
            "Company name must be valid"),
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

const SignUpForm: FC<SignUpFormProps & {className: string}> = props => {
    const {signUp, className, error, company, isLoadingCompany} = props;

    return (
        <Formik
            initialValues={{email: '', password: '', companyName: '', username: '', passwordRepeat: ''}}
            validationSchema={schema}
            onSubmit={values => {
                signUp({
                    userDto: {
                        email: values.email,
                        password: values.password,
                        companyName: values.companyName,
                        username: values.username
                    },
                    byEmail: company ? true : false
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
                    || (touched.companyName && errors.companyName)
                    || (touched.password && errors.password)
                    || (touched.passwordRepeat && errors.passwordRepeat)
                    || error;
                
                const setCompanyName = (companyName: string) => {
                    values.companyName = companyName;
                };

                return (
                    <form className={className} onSubmit={handleSubmit} autoComplete="off">
                        <Typography fontWeight="bold" variant="h4">Create Account</Typography>
                        <Typography variant="body2">or use your email for registration</Typography>
                        <Input name="username" placeholder="Username" value={values.username}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        <LoaderWrapper loading={isLoadingCompany}>
                            {company ? 
                            <>
                            <Input name="email" placeholder="Email" value={values.username +"@"+ company.emailDomain}
                                onChange={values.email=values.username +"@"+company.emailDomain}
                                onBlur={handleBlur} disabled
                            /> 
                            {setCompanyName(company.name)}
                            </> : <>
                            <Input name="email" placeholder="Email" value={values.email}
                                onChange={handleChange} onBlur={handleBlur}/>
                            <Input name="companyName" placeholder="Company" value={values.companyName}
                            onChange={handleChange} onBlur={handleBlur}
                            /> </>
                            }
                        </LoaderWrapper>
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
                    </form>);}}
        </Formik>
    );
};

const mapState = (state: IAppState) => ({
    isLoading: state.user.isLoading,
    error: state.user.error?.register,
    company: state.company.currentCompany,
    isLoadingCompany: state.company.isLoading
});

const mapDispatch = {
    signUp: registerRoutine
};

const connector = connect(mapState, mapDispatch);

type SignUpFormProps = ConnectedProps<typeof connector>;

export default connector(SignUpForm);

