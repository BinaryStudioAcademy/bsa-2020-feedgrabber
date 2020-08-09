import * as yup from 'yup';
import React from "react";
import {Formik} from "formik";
import {Button, Form, Segment} from "semantic-ui-react";

const TestContainer = () => {

    const initialValues = {
        answers: []
    };
    const validationSchema = {};
    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => console.log(values)}>
            {
                formik => (
                    <Form name='questionForm' size='large' onSubmit={formik.handleSubmit}>
                        <Segment>

                        </Segment>
                        <Button type='submit' label={'submit'} />
                    </Form>
                )
            }
        </Formik>
    );
};

export default TestContainer;