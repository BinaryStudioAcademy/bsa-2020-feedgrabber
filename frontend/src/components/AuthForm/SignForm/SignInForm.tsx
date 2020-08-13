import React, {FC} from 'react';
import Typography from './Typography';
import Input from './Input';
import Button from './Button';
import * as yup from "yup";
import {Formik} from 'formik';
import {loginRoutine} from 'sagas/auth/routines';
import {connect, ConnectedProps} from 'react-redux';
import {Button as SemanticButton, Grid, Header, Icon, Message, Segment} from "semantic-ui-react";
import {IAppState} from "../../../models/IAppState";
import CompanySelectorForm from "./CompanySelectorForm";
import styles from "./CompanySelectorForm/styles.module.sass";
import {dropCompanyRoutine} from "../../../sagas/companies/routines";

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

const SignInForm: FC<SignInFormProps & { className: string }> = props => {
    const {signIn, dropCompany, className, error, company} = props;

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
        <Formik
            initialValues={{password: '', username: ''}}
            validationSchema={schema}
            onSubmit={values => {
                signIn({
                    password: values.password,
                    username: values.username,
                    companyId: company.id
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
                const errorText = errors.username || errors.password || error;

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
                        {companyCard}
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
    );
};

const mapState = (state: IAppState) => ({
    isLoading: state.user.isLoading,
    error: state.user.error.login,
    company: state.company.currentCompany
});

const mapDispatch = {
    signIn: loginRoutine,
    dropCompany: dropCompanyRoutine
};

const connector = connect(mapState, mapDispatch);

type SignInFormProps = ConnectedProps<typeof connector>;

export default connector(SignInForm);

