import React, {FC, useEffect} from 'react';
import Typography from './Typography';
import Input from './Input';
import Button from './Button';
import * as yup from "yup";
import {Formik} from 'formik';
import {getUserShortRoutine, loginRoutine, sendEmailToResetPasswordRoutine} from 'sagas/auth/routines';
import {connect, ConnectedProps} from 'react-redux';
import {Button as SemanticButton, Grid, Header, Icon, Message, Segment} from "semantic-ui-react";
import {IAppState} from "../../../models/IAppState";
import CompanySelectorForm from "./CompanySelectorForm";
import styles from "./CompanySelectorForm/styles.module.sass";
import {dropCompanyRoutine} from "../../../sagas/companies/routines";
import LoaderWrapper from "../../LoaderWrapper";

const schema = yup.object().shape({
    password: yup
        .string()
        .required("Password required")
        .min(8, "Password too short!")
        .max(16, "Password too long!")
        .matches(/^\w[A-Za-z\d!#$%&'*+\-/=?^_`{}]+$/,
            "Password contains at least 8 characters ( letters, digits and !#$%&'*+-/=?^_`{} )"),
    username: yup
        .string()
        .required("Username required")
        .min(5, "Username too short!")
        .max(15, "Username too long!")
        .matches(/^\w([A-Za-zА-Яа-я\d!#$%&'*+\-/=?^_`])([ ]?[A-Za-zА-Яа-я\d!#$%&'*+\-/=?^_`])*$/,
            "Username must be valid")
});

const SignInForm: FC<SignInFormProps & { className: string }> = ({
    signIn,
    dropCompany,
    className,
    error,
    company,
    userEmail,
    resetPassword,
    isLoading,
    userName,
    loadUserName
}) => {

    useEffect(() => {
      if(company && userEmail) {
        loadUserName({email: userEmail, companyId: company.id});
      }}, [company, loadUserName, userEmail]);
    if (!company) {
        return (<CompanySelectorForm className={className}/>);
    }

    const companyCard = (
        <Segment style={{width: '284px'}}>
            <Grid>
                <Grid.Column width={4}>
                    <SemanticButton type='button'
                                    icon
                                    basic
                                    size='small'
                                    onClick={() => dropCompany()}>
                        <Icon name='arrow left' inverted color='red' size='large'/>
                    </SemanticButton>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Header textAlign='left' as='h4' className={styles.company}>
                        {company.name}
                    </Header>
                </Grid.Column>
            </Grid>
        </Segment>);

    return (
        <LoaderWrapper loading={isLoading}>
        <Formik
            initialValues={{password: '', username: userName}}
            validationSchema={schema}
            onSubmit={values => {
                signIn({
                    password: values.password,
                    username: values.username,
                    companyId: company.id
                });
            }}
        >
            {({
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit
              }) => {
                const errorText = errors.username || errors.password || error;

                return (
                    <form className={className} onSubmit={handleSubmit} autoComplete="off">
                        <Typography fontWeight="bold" variant="h4">Sign In</Typography>
                        <Typography variant="body2">or use your account</Typography>
                        <Input name="username" placeholder="Username" value={values.username}
                               disabled
                        />
                        <Input name="password" type="password" placeholder="Password" value={values.password}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        <a href="#"
                            onClick={() => resetPassword({userEmail, companyId: company.id})}
                        >Reset password</a>
                        {
                            companyCard
                        }
                        {
                            errorText && <Message attached="top" error size="small" content={errorText}/>
                        }
                        <Button disabled={!!errorText && errorText !== error}
                                variant="secondary"
                                type="submit"
                                marginTop="1.17rem">
                            Sign In
                        </Button>
                    </form>);
            }}
        </Formik>
        </LoaderWrapper>
    );
};

const mapState = (state: IAppState) => ({
    isLoading: state.user.isLoading,
    error: state.user.error?.login,
    company: state.company.currentCompany,
    userEmail: state.user.info?.email,
    userName: state.user.shortInfo?.username
});

const mapDispatch = {
    signIn: loginRoutine,
    dropCompany: dropCompanyRoutine,
    resetPassword: sendEmailToResetPasswordRoutine,
    loadUserName: getUserShortRoutine
};

const connector = connect(mapState, mapDispatch);

type SignInFormProps = ConnectedProps<typeof connector>;

export default connector(SignInForm);

