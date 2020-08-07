import React from "react";
import { Formik } from "formik";
import { Form, Button, Segment } from "semantic-ui-react";
import { IQuestion } from "../../models/IQuestion";
import * as yup from "yup";

interface IInputFieldProps {
  question: IQuestion;
  editText(text: string): void;
}

const validationSchema = yup.object().shape({
  text: yup
    .string()
    .required()
    .min(10, "min 10 characters")
    .max(200, "max 200 characters.")
});

const InputField: React.FC<IInputFieldProps> = ({ editText, question }) => {
  return (
    <Formik
      initialValues={{ text: question.text }}
      validationSchema={validationSchema}
      onSubmit={values => editText(values.text)}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit, touched }) => (
        <Form name="questionForm" size="large" onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              icon="at"
              iconPosition="left"
              placeholder="This is might be you question here..."
              type="text"
              name="text"
              value={values.text}
              error={touched.text && errors.text ? errors.text : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button type="submit" color="teal" fluid size="large">
              Sumbit
            </Button>
          </Segment>
        </Form>
      )}
    </Formik>
  );
};

export default InputField;
