import React, {useEffect} from "react";
import * as yup from "yup";

import styles from './styles.module.sass';
import {IAppState} from "../../models/IAppState";
import {connect} from "react-redux";
import {loadInvitationSingUpRoutine, registerInvitationSingUpRoutine} from "../../sagas/invitationSignUp/routines";
import {IInvitationSignUpData, IRegisterInvitationSignUpData} from "../../reducers/invitationSignUp/reducer";
import LoaderWrapper from "../../components/LoaderWrapper";
import {Formik} from "formik";
import {Button, Input, Message} from "semantic-ui-react";

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
    <div className={styles.pageWrapper}>
      <div className={styles.pageContent}>
        <LoaderWrapper loading={isLoading}>
          {invitationData && (
            <>
              <h1 className={styles.pageTitle}>Welcome to<br/>{invitationData.companyName}</h1>
              <div className={styles.formWrapper}>
                <div className={styles.formContent}>
                  <Formik
                    initialValues={{email: '', password: '', companyName: '', username: ''}}
                    validationSchema={schema}
                    onSubmit={values => {
                      registerByInvitation({
                        email: values.email,
                        password: values.password,
                        invitationId: match.params.id,
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
                      const errorText = errors.username || errors.email || errors.companyName
                        || errors.password || error;

                      return (
                        <form onSubmit={handleSubmit} autoComplete="off">
                          <Input name="username" placeholder="Username" value={values.username}
                                 onChange={handleChange} onBlur={handleBlur} fluid
                          />
                          <Input name="email" placeholder="Email" value={values.email}
                                 onChange={handleChange} onBlur={handleBlur} fluid
                          />
                          <Input name="password" type="password" placeholder="Password" value={values.password}
                                 onChange={handleChange} onBlur={handleBlur} fluid
                          />
                          {
                            errorText && <Message className={styles.errorMessage} attached="top" error
                                                  size="small" content={errorText}/>
                          }
                          <Button
                            className={styles.submitButton}
                            loading={registerLoading}
                            disabled={!!errorText && errorText !== error || registerLoading}
                            primary
                            type="submit"
                          >
                            Sign Up
                          </Button>
                        </form>);
                    }}
                  </Formik>
                </div>
              </div>
            </>
          )}
          {loadFailed && (
            <h1 className={styles.pageError}>
              Unable to load data.<br/>Maybe, the link is not relevant
            </h1>
          )}
        </LoaderWrapper>
      </div>
    </div>
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
