import React, {FunctionComponent} from 'react';
import {Grid, Form, Image, Button} from "semantic-ui-react";
import './styles.sass';
import '../ProfilePage/styles.sass';
import {Formik} from 'formik';
import * as yup from 'yup';

export interface IUserInfo {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    avatar: string;
}

interface IProfileInfoProps {
    profile: IUserInfo;
    save(data: IUserInfo): void;
}

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

const ProfileInfo: FunctionComponent<IProfileInfoProps> =
    ({profile, save}) => {
        return (
            <Grid container textAlign="center">
                <Grid.Column>
                    <Image centered src={profile.avatar}
                           size={"small"} circular/>
                    <br/>
                    <br/>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            userName: profile.userName,
                            firstName: profile.firstName,
                            lastName: profile.lastName,
                            phoneNumber: profile.phoneNumber
                        }}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            save({
                                id: profile.id,
                                userName: values.userName,
                                firstName: values.firstName,
                                lastName: values.lastName,
                                phoneNumber: values.phoneNumber,
                                avatar: profile.avatar
                            });
                        }
                        }
                    >
                        {({
                              errors,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                              dirty,
                              isValid,
                              values,
                              touched
                          }) => (
                            <Form name="userForm" onSubmit={handleSubmit}>
                                <Form.Input className={"form-field"}
                                            icon="user circle"
                                            iconPosition="left"
                                            placeholder="Username"
                                            name="userName"
                                            type="text"
                                            value={values.userName}
                                            error={touched.userName && errors.userName ? errors.userName : undefined}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                />
                                <Form.Input className={"form-field"}
                                            icon="address card outline"
                                            iconPosition="left"
                                            placeholder="First name"
                                            type="text"
                                            name="firstName"
                                            value={values.firstName}
                                            error={touched.firstName && errors.firstName ? errors.firstName : undefined}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                />
                                <Form.Input className={"form-field"}
                                            icon="address card outline"
                                            iconPosition="left"
                                            placeholder="Last name"
                                            type="text"
                                            name="lastName"
                                            value={values.lastName}
                                            error={touched.lastName && errors.lastName ? errors.lastName : undefined}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                />
                                <Form.Input className={"form-field"}
                                            icon="phone"
                                            iconPosition="left"
                                            placeholder="099-999-99-99"
                                            type="tel"
                                            name="phoneNumber"
                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                                            value={values.phoneNumber}
                                            error={touched.phoneNumber && errors.phoneNumber ?
                                                errors.phoneNumber : undefined}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                />
                                <br/>
                                <div>
                                    <Button disabled={isSubmitting || !dirty || !isValid} primary
                                            type="submit">Save</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Grid.Column>
            </Grid>

        );
    };

ProfileInfo.defaultProps = {
    profile: {
        id: '07944172-105f-4289-a7bf-3f23a374c15f',
        userName: 'makario',
        firstName: 'Makar',
        lastName: 'Kulminets',
        phoneNumber: '099-999-34-54',
        avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
    }
};
export default ProfileInfo;