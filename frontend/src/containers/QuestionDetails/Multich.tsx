import React from 'react';
import {FieldArray, FormikProps} from 'formik';
import {Form, Segment, Icon, Label} from 'semantic-ui-react';
interface IMultichiceQuestion {
  options: string[];
  formik: FormikProps<any>;
}
const MultichoiceQuestion: React.FC<IMultichiceQuestion> = ({ options, formik }) => {
  return (
    <Segment>
      <FieldArray name="answers">{({push, remove}) => (
        <div>
          {formik.values.answers.map((answer, index) => (
            <div className={"option-container"} key={index}>
              <Form.Input
                className={"answer-input"}
                fluid
                icon="check square outline"
                transparent
                iconPosition="left"
                placeholder="Type answer here..."
                type="text"
                name={`answers.${index}`}
                value={formik.values.answers[index]}
                error={
                  formik.touched.answers && formik.errors.answers
                  && formik.touched.answers[index]
                  && Array.isArray(formik.errors.answers) && formik.errors.answers[index]
                    ? formik.errors.answers[index]
                    : undefined
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Icon className={"close-icon unselected"} name={"remove"} onClick={() => remove(index)}/>
            </div>
          ))}
          <div className={"option-container unselected left-grouped"}>
            <Icon name={"check square outline"}/>
            <span className="check square outline" onClick={() => { push(''); }}>Add new answer</span>
          </div>
        </div>
      )}</FieldArray>
      {formik.errors.answers && formik.touched.answers && !Array.isArray(formik.errors.answers)
        && <Label basic color='red'>{formik.errors.answers}</Label>}
    </Segment>
  );
};
export default MultichoiceQuestion;