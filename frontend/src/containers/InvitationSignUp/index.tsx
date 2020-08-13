import React, {useEffect} from "react";
import * as yup from "yup";

import styles from './styles.module.sass';
import {IAppState} from "../../models/IAppState";
import {connect} from "react-redux";
import {loadInvitationSingUpRoutine} from "../../sagas/invitationSignUp/routines";
import {IInvitationSignUpData} from "../../reducers/invitationSignUp/reducer";
import LoaderWrapper from "../../components/LoaderWrapper";

interface IInvitationSignUpProps {
  match: any;
  invitationData?: IInvitationSignUpData;
  error?: boolean;
  isLoading?: boolean;

  loadInvitationData(id: string): void;
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
    error,
    loadInvitationData
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
            <h1 className={styles.pageTitle}>Welcome to<br/>{invitationData.companyName}</h1>
          )}
          {error && (
            <h1 className={styles.pageError}>
              Unable to load data.<br />Maybe, the link is not relevant
            </h1>
          )}
        </LoaderWrapper>
      </div>
    </div>
  );
  // return (
  //   <Formik
  //     initialValues={{email: '', password: '', companyName: '', username: ''}}
  //     validationSchema={schema}
  //     onSubmit={() => {
  //       // signUp({
  //       //   email: values.email,
  //       //   password: values.password,
  //       //   companyName: values.companyName,
  //       //   username: values.username
  //       // });
  //     }
  //     }
  //   >
  //     {({
  //         errors,
  //         values,
  //         handleChange,
  //         handleBlur,
  //         handleSubmit
  //       }) => {
  //       const errorText = errors.username || errors.email || errors.companyName || errors.password || error;
  //
  //       return (
  //         <form onSubmit={handleSubmit} autoComplete="off">
  //           <Input name="username" placeholder="Username" value={values.username}
  //                  onChange={handleChange} onBlur={handleBlur}
  //           />
  //           <Input name="email" placeholder="Email" value={values.email}
  //                  onChange={handleChange} onBlur={handleBlur}
  //           />
  //           <Input name="password" type="password" placeholder="Password" value={values.password}
  //                  onChange={handleChange} onBlur={handleBlur}
  //           />
  //           {
  //             errorText && <Message attached="top" error size="small" content={errorText}/>
  //           }
  //           <Button disabled={!!errorText && errorText !== error}
  //                   variant="secondary"
  //                   type="submit"
  //                   marginTop="1.17rem">
  //             Sign Up
  //           </Button>
  //         </form>);}}
  //   </Formik>
  // );
};

const mapStateToProps = (rootState: IAppState) => ({
  invitationData: rootState.invitationSignUp.data,
  error: rootState.invitationSignUp.error,
  isLoading: rootState.invitationSignUp.isLoading
});

const mapDispatchToProps = {
  loadInvitationData: loadInvitationSingUpRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(InvitationSignUp);
