import React, {useEffect} from "react";
import * as yup from "yup";
import {IAppState} from "../../models/IAppState";
import {connect} from "react-redux";
import {loadInvitationSingUpRoutine, registerInvitationSingUpRoutine} from "../../sagas/invitationSignUp/routines";
import {IInvitationSignUpData, IRegisterInvitationSignUpData} from "../../reducers/invitationSignUp/reducer";
import LoaderWrapper from "../../components/LoaderWrapper";
import {Formik} from "formik";
import { Menu, Message } from "semantic-ui-react";
import {Link} from "react-router-dom";
import img from "../../assets/images/bg-pattern.jpg";
import styled from "styled-components";
import {theme} from "../../components/AuthForm/SignForm/Theme";

import styles from './styles.module.sass';
import Typography from "../../components/AuthForm/SignForm/Typography";
import Button from "components/AuthForm/SignForm/Button";
import Input from "../../components/AuthForm/SignForm/Input";

const StyledMenu = styled(Menu)`
  background-color: transparent !important;
  backdrop-filter: blur(10px);
  box-shadow: none;
  font-family: 'Quicksand-Bold', sans-serif !important;
  font-size: 1.5rem !important;
`;

const Root = styled.div`
  background-image: url(${img});
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
`;

const Container = styled.div`
  border-radius: 10px;
  background-color: ${theme.color.white};
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 560px;
  text-align: center;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
`;

const Overlay = styled.div`
  background: #ff416c;
  background: linear-gradient(to right, #9965f4 20%, #0000d6 100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  right: 0;
`;

interface IInvitationSignUpProps {
    match: any;
    invitationData?: IInvitationSignUpData;
    loadFailed?: boolean;
    error?: string;
    isLoading?: boolean;
    registerLoading?: boolean;

    loadInvitationData(id: string): void;

    registerByInvitation(request: IRegisterInvitationSignUpData): void;
}

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
            "Username must be valid"),
    passwordRepeat: yup
        .string()
        .required("Repeat password")
        .oneOf([yup.ref('password')], 'Passwords must match')
});

const InvitationSignUp: React.FunctionComponent<IInvitationSignUpProps> = (
    {
        match,
        invitationData,
        isLoading,
        registerLoading,
        loadFailed,
        error,
        loadInvitationData,
        registerByInvitation
    }
) => {
    useEffect(() => {
        if (!invitationData) {
            loadInvitationData(match.params.id);
        }
    }, [invitationData, loadInvitationData, match]);

    return (
        <>
            <StyledMenu fixed='top'>
                <Menu.Item as={Link} to='/layout' header style={{padding: '10px 27px 10px 27px'}}>
                    <img
                        style={{borderRadius: 10, paddingRight: 10}}
                        src={require('../../assets/images/icon_bg.jpg')}
                        alt='Logo'
                    />
                    FeedGrabber
                </Menu.Item>
            </StyledMenu>
            <Root>
                <Container>
                    <div className={styles.pageWrapper}>
                        <div className={styles.pageContent}>
                            <LoaderWrapper loading={isLoading}>
                                {invitationData && (
                                    <>
                                        <h1 className={styles.pageTitle}>
                                            {invitationData.expired &&
                                            <>
                                                Unfortunately,<br/>this link has been
                                                expired
                                                <br/>
                                                <br/>
                                                <Link to={"/layout"}> Go to main page </Link>
                                            </>}
                                            {invitationData.accepted && <>
                                                You have already registered<br/>using this
                                                link
                                                <br/>
                                                <br/>
                                                <Link to={"/layout"}> Go to main page </Link>
                                            </>}
                                        </h1>
                                        {!invitationData.expired && !invitationData.accepted && (
                                            <>
                                            <div className={styles.formWrapper}>
                                                <div className={styles.formContent}>
                                                    <Typography fontWeight="bold" variant="h4">
                                                        Create Account
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        by this invitation link.
                                                    </Typography>
                                                    <Formik
                                                        initialValues={{password: '', username: '', passwordRepeat: ''}}
                                                        validationSchema={schema}
                                                        onSubmit={values => {
                                                            registerByInvitation({
                                                                password: values.password,
                                                                invitationId: match.params.id,
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
                                                                || (touched.password && errors.password)
                                                                || (touched.passwordRepeat && errors.passwordRepeat)
                                                                || error;

                                                            return (
                                                                <form onSubmit={handleSubmit} autoComplete="off">
                                                                    <Input name="username" placeholder="Username"
                                                                           value={values.username}
                                                                           onChange={handleChange}
                                                                           onBlur={handleBlur}
                                                                    />
                                                                    <Input name="password" type="password"
                                                                           placeholder="Password"
                                                                           value={values.password}
                                                                           onChange={handleChange}
                                                                           onBlur={handleBlur}
                                                                    />
                                                                    <Input name="passwordRepeat" type="password"
                                                                           placeholder="Confirm password"
                                                                           value={values.passwordRepeat}
                                                                           onChange={handleChange}
                                                                           onBlur={handleBlur}
                                                                    />
                                                                    {
                                                                        errorText &&
                                                                        <Message className={styles.errorMessage}
                                                                                 attached="top" error
                                                                                 size="small" content={errorText}/>
                                                                    }
                                                                    <Button
                                                                        className={styles.submitButton}
                                                                        loading={registerLoading}
                                                                        disabled={!!errorText && errorText !== error
                                                                        || registerLoading}
                                                                        variant="secondary"
                                                                        type="submit"
                                                                    >
                                                                        Sign Up
                                                                    </Button>
                                                                </form>);
                                                        }}
                                                    </Formik>
                                                </div>
                                            </div>
                                            <OverlayContainer>
                                                 <Overlay>
                                                    <OverlayPanel>
                                                        <Typography fontWeight="bold" variant="h4" color="white">
                                                            Welcome to <br /> {invitationData.companyName}!
                                                        </Typography>
                                                        <Typography variant="body" color="white">
                                                            Enter your personal details and start journey with us ;)
                                                        </Typography>
                                                    </OverlayPanel>
                                                 </Overlay>
                                            </OverlayContainer>
                                        </>
                                        )}
                                    </>
                                )}
                                {loadFailed && (
                                    <h1 className={styles.pageError}>
                                        Unable to load data.<br/>Maybe, the link is not relevant
                                        <br/>
                                        <br/>
                                        <Link to={"/layout"}> Go to main page </Link>
                                    </h1>
                                )}
                            </LoaderWrapper>
                        </div>
                    </div>
                </Container>
            </Root>
        </>
    );
};

const mapStateToProps = (rootState: IAppState) => ({
    invitationData: rootState.invitationSignUp.data,
    loadFailed: rootState.invitationSignUp.loadFailed,
    error: rootState.invitationSignUp.error,
    isLoading: rootState.invitationSignUp.isLoading,
    registerLoading: rootState.invitationSignUp.registerLoading
});

const mapDispatchToProps = {
    loadInvitationData: loadInvitationSingUpRoutine,
    registerByInvitation: registerInvitationSingUpRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(InvitationSignUp);
