import React from "react";
import { Button } from "semantic-ui-react";
import styles from './styles.module.sass';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';

interface IDropdownQuestionProps {
    answerOptions: string[];
    handleSubmit: any;
}

const validationSchema = Yup.object({
   answer: Yup.string()
       .required("Choose answer")
});

const DropdownQuestion: React.FC<IDropdownQuestionProps> = ({ answerOptions, handleSubmit}) => {
    return (
        <Formik
            initialValues={{
              answer: ""
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className={styles.questionForm}>
                <Field as="select"
                       className={"ui selection dropdown"}
                       name="answer"
                >
                    <option className={styles.defaultValue} value="">Select value</option>
                    {answerOptions.map(option => {
                        return (
                            <option value={option}>{option}</option>
                        );
                    })}
                </Field>
                <div className={styles.error}>
                    <ErrorMessage className={styles.error} name="answer" />
                </div>
                <Button type="submit">Submit</Button>
            </Form>
        </Formik>
    );
};

export default DropdownQuestion;
