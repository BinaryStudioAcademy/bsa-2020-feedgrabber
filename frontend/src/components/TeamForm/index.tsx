import React from 'react';
import {Formik} from 'formik';
import {Button, Form, Segment} from 'semantic-ui-react';
import * as yup from 'yup';
import Cards from "../Cards";

const schema = yup.object().shape({
    teamName: yup
        .string()
        .required("Required")
        .min(3, "Too Short!")
        .max(50, "Too Long!")
});

const TeamForm: React.FC = () => {

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
                            icon="at"
                            iconPosition="left"
                            placeholder="name"
                            name="teamName"
                            error={touched.teamName && errors.teamName ? errors.teamName : null}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Cards setSelected={setFieldValue} selectedUsers={values.selectedUsers}/>
                        <Button type="submit"
                                color="teal"
                                fluid size="large"
                                primary
                                content="Create"
                        />
                    </Segment>
                </Form>
            )}
        </Formik>);
};

export default TeamForm;
