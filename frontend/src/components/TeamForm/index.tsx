import React from 'react';
import {Formik} from 'formik';
import {Button, Form, Segment} from 'semantic-ui-react';
import * as yup from 'yup';
import UserSelection from "./UserSelection";

const schema = yup.object().shape({
    teamName: yup
        .string()
        .required("Required")
        .min(3, "Too Short!")
        .max(50, "Too Long!"),
    selectedUsers: yup
        .array()
        .min(1)
});

const TeamForm: React.FC = () => {
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
                            placeholder="Team Name"
                            name="teamName"
                            error={touched.teamName && errors.teamName ? errors.teamName : null}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <UserSelection setSelected={setFieldValue} selectedUsers={values.selectedUsers}/>
                        <Button type="submit"
                                color="teal"
                                primary
                                fluid size="large"
                                content="Create"
                        />
                    </Segment>
                </Form>
            )}
        </Formik>);
};

export default TeamForm;
