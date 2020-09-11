import React, {FC} from 'react';
import {Formik} from 'formik';
import {Button, Form, Segment} from 'semantic-ui-react';
import * as yup from 'yup';
import UserSelection from './UserSelection';
import { useTranslation } from 'react-i18next';

const schema = yup.object().shape({
    teamName: yup
        .string()
        .required("Required")
        .min(1, "Too Short!")
        .max(40, "Too Long!")
        .matches(/([A-Za-zА-Яа-яїЇґҐіІєЄ\d!#$%&'*+\-/=?^_`])([ ]?[A-Za-zА-Яа-яїЇґҐіІєЄ\d!#$%&'*+\-/=?^_`])*$/,
            "Team name must be valid"),
    selectedUsers: yup
        .array()
        .min(1)
});

const TeamForm: FC = () => {
    const [t] = useTranslation();
    //  TODO pass users to UserSelection from store
    return (
        <Formik
            initialValues={{
                teamName: '', selectedUsers: []
            }}
            validationSchema={schema}
            onSubmit={values => console.log(values)}
        >
            {({
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  touched
              }) => (
                <Form name="loginForm" size="large" onSubmit={handleSubmit}>
                    <Segment>

                        <Form.Input
                            fluid
                            icon="group"
                            iconPosition="left"
                            placeholder={t("Team Name")}
                            name="teamName"
                            error={touched.teamName && errors.teamName ? t(errors.teamName) : null}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <UserSelection users={null} setSelected={setFieldValue} selectedUsers={values.selectedUsers}/>
                        <Button type="submit"
                                color="teal"
                                primary
                                fluid size="large"
                                content={t("Create")}
                        />
                    </Segment>
                </Form>
            )}
        </Formik>);
};

export default TeamForm;
