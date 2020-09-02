import React, {useEffect} from 'react';
import {Formik} from 'formik';
import UIButton from "../../UI/UIButton";
import UITextInput from "../../UI/UITextInput/UITextInput";
import {Form} from "semantic-ui-react";
import styles from '../styles.module.sass';
import {IAppState} from "../../../models/IAppState";
import * as yup from "yup";
import {connect, ConnectedProps} from "react-redux";
import {getUserRoutine} from "../../../sagas/auth/routines";
import {updateUserPasswordRoutine, updateUserUsernameRoutine} from "../../../sagas/user/routines";
import {useTranslation} from "react-i18next";
import validation from "../../../helpers/validation.helper";

const usernameSchema = yup.object().shape({
  username: validation.username
});

const passwordSchema = yup.object().shape({
  newPassword: validation.password,
  newPasswordAgain: yup
      .string()
      .required("Repeat the password")
      .oneOf([yup.ref("newPassword")], "Passwords must match")
});

const ProfileSecurity: React.FC<ProfileSecurityProps> =
    ({
       user,
       isLoading,
       updateUsername,
       updatePassword,
       getUser
     }) => {
      const [t] = useTranslation();
        useEffect(() => {
            !user && getUser();
        }, [getUser, user]);

      const initialUsername = {
        username: user?.userName
      };
      const initialPassword = {
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      };

      return (
          !isLoading && !!user &&
          <>
            <h4 className={styles.header}>{t("Change your username")}</h4>
            <Formik
                enableReinitialize
                initialValues={initialUsername}
                validationSchema={usernameSchema}
                onSubmit={values => {
                  updateUsername(values);
                }}
            >
              {formik => (
                  <Form onSubmit={formik.handleSubmit}>
                    <UITextInput labelText={'Username'}
                                 placeholder={t('Type your username...')}
                                 name='username'
                                 value={formik.values.username}
                                 error={formik.touched.username && formik.errors.username}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 onClick={() => formik.setFieldError('username', null)}
                    />
                    <UIButton disabled={!!formik.errors.username}
                              submit
                              title={t('Update Username')}/>
                  </Form>
              )}
            </Formik>

            <h4 className={styles.header}>{t("Change your password")}</h4>
            <Formik
                // enableReinitialize
                initialValues={initialPassword}
                validationSchema={passwordSchema}
                onSubmit={values => {
                  updatePassword({
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword
                  });
                }}
            >
              {formik => (
                  <Form onSubmit={event => {
                    formik.handleSubmit(event);
                  }}>
                    <UITextInput password
                                 labelText={t("Old Password")}
                                 placeholder={''}
                                 name='oldPassword'
                                 value={formik.values.oldPassword}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                    />
                    <UITextInput password
                                 labelText={t("New Password")}
                                 placeholder={''}
                                 name='newPassword'
                                 value={formik.values.newPassword}
                                 onChange={formik.handleChange}
                                 error={formik.touched.newPassword && t(formik.errors.newPassword)}
                                 onBlur={formik.handleBlur}
                    />
                    <UITextInput password
                                 labelText={t("Repeat New Password")}
                                 placeholder={''}
                                 name='newPasswordAgain'
                                 value={formik.values.newPasswordAgain}
                                 onChange={formik.handleChange}
                                 error={formik.touched.newPasswordAgain && t(formik.errors.newPasswordAgain)}
                                 // onBlur={() => {
                                 //   if (formik.values.newPasswordAgain !== formik.values.newPassword) {
                                 //     formik.setFieldError('newPasswordAgain', 'Password must match');
                                 //   } else {
                                 //     formik.setFieldError('newPasswordAgain', null);
                                 //   }
                                 // }}
                                onBlur={formik.handleBlur}
                    />
                    <UIButton disabled={!!(formik.values === initialPassword
                        || formik.errors.oldPassword
                        || formik.errors.newPassword
                        || formik.errors.newPasswordAgain)}
                              submit
                              title={t("Update password")}/>

                  </Form>
              )}
            </Formik>
          </>
      );
    };

const mapStateToProps = (state: IAppState) => ({
  user: state.user.info,
  isLoading: state.user.isLoading
});
const mapDispatchToProps = {
  getUser: getUserRoutine,
  updateUsername: updateUserUsernameRoutine,
  updatePassword: updateUserPasswordRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ProfileSecurityProps = ConnectedProps<typeof connector>;

export default connector(ProfileSecurity);
