import React, {FC, useEffect} from 'react';
import {Button, Form, Grid, Image} from "semantic-ui-react";
import './styles.sass';
import '../styles.sass';
import {Formik} from 'formik';
import * as yup from 'yup';
import {connect, ConnectedProps} from "react-redux";
import {IAppState} from "../../../models/IAppState";
import {getUserRoutine} from "../../../sagas/auth/routines";

const validationSchema = yup.object().shape({
    userName: yup
        .string()
        .required("Username is required")
        .min(3, "Username must contains at least 3 characters"),
    firstName: yup
        .string()
        .required("First name is required"),
    lastName: yup
        .string()
        .required("Last name is required"),
    phoneNumber: yup
        .string()
        .length(13, "Please enter valid phone number 099-999-99-99")
        .matches(/[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}/, "Please enter valid phone number 099-999-99-99")
});

const ProfileInfo: FC<ProfileInfoProps> = props => {
        const {user, save, isLoading, pullUser} = props;

        useEffect(() => {
            pullUser();
        }, [pullUser]);

        return (
                <Grid container textAlign="center">
                    {!isLoading &&
                    <Grid.Column>
                      <Image centered src={user.avatar}
                             size={"small"} circular/>
                      <br/>
                      <br/>
                      <Formik
                        enableReinitialize
                        initialValues={{
                            userName: user.userName,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            phoneNumber: user.phoneNumber
                        }}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            save({
                                id: user.id,
                                userName: values.userName,
                                firstName: values.firstName,
                                lastName: values.lastName,
                                phoneNumber: values.phoneNumber,
                                avatar: user.avatar
                            });
                        }
                        }
                      >
                          {({
                                errors,
                                values,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                isValid,
                                touched
                            }) => (
                              <Form name="userForm" onSubmit={handleSubmit}>
                                  <Form.Input className="form-field"
                                              icon="user circle"
                                              iconPosition="left"
                                              placeholder="Username"
                                              name="userName"
                                              value={values.userName || ''}
                                              error={(touched.userName && errors.userName) ?? null}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                  />
                                  <Form.Input className="form-field"
                                              icon="address card outline"
                                              iconPosition="left"
                                              placeholder="First name"
                                              name="firstName"
                                              value={values.firstName || ''}
                                              onChange={handleChange}
                                              error={(touched.firstName && errors.firstName) ?? null}
                                              onBlur={handleBlur}
                                  />
                                  <Form.Input className="form-field"
                                              icon="address card outline"
                                              iconPosition="left"
                                              placeholder="Last name"
                                              name="lastName"
                                              value={values.lastName || ''}
                                              error={(touched.lastName && errors.lastName) ?? null}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                  />
                                  <Form.Input className="form-field"
                                              icon="phone"
                                              iconPosition="left"
                                              value={values.phoneNumber || ''}
                                              placeholder="099-999-99-99"
                                              name="phoneNumber"
                                              error={(touched.firstName && errors.phoneNumber) ?? null}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                  />
                                  <br/>
                                  <div>
                                      <Button disabled={isSubmitting || !isValid} primary
                                              type="submit">Save</Button>
                                  </div>
                              </Form>
                          )}
                      </Formik>
                    </Grid.Column>
                    }
                </Grid>
        );
    };

const mapState = (state: IAppState) => ({
    user: state.user.info,
    isLoading: state.user.isLoading ?? true
});

const mapDispatch = {
    pullUser: getUserRoutine,
    save: undefined
};

const connector = connect(mapState, mapDispatch);

type ProfileInfoProps = ConnectedProps<typeof connector>;

export default connector(ProfileInfo);
