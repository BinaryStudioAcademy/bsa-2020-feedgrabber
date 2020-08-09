import React from 'react';
import { Form, Icon, Segment} from 'semantic-ui-react';
import './styles.sass';
import {FieldArray, Formik} from 'formik';
import * as yup from 'yup';

interface IRadioButtonQuestionUIProps {
    answers: string[];
}

const RadioButtonQuestionUI: React.FC<IRadioButtonQuestionUIProps> =
    ({answers}) => {

        const validationSchema = yup.object().shape({
            answers: yup.array()
                .of(yup
                    .string()
                    .required(`Answer can't be empty`)
                    .max(200, 'Answer must be shorter then 200 symbols')
                )
        });

        return (
            <Formik
                enableReinitialize
                initialValues={{answers: answers, includeOther: false}}
                validationSchema={validationSchema}
                onSubmit={() => console.log('submitted')}
            >
                {(
                    {
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        values,
                        touched
                    }) => (
                    <Form name="questionForm" size="large" onSubmit={handleSubmit}>
                        <Segment>
                            <FieldArray name="answers">{({push, remove}) => (
                                <div>
                                    {values.answers.map((answer, index) => (
                                        <div className={"option-container"} key={index}>
                                            <Form.Input
                                                className={"answer-input"}
                                                fluid
                                                icon="circle outline"
                                                transparent
                                                iconPosition="left"
                                                placeholder="Type answer here..."
                                                type="text"
                                                name={`answers.${index}`}
                                                value={values.answers[index]}
                                                error={touched.answers && errors.answers && touched.answers[index]
                                                && errors.answers[index] ? errors.answers[index] : undefined}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {values.answers.length!==1 && (
                                                <Icon className={"close-icon unselected"} name={"x"} onClick={() =>
                                                    remove(index)
                                                }/>
                                            )}
                                        </div>
                                    ))}
                                    {values.includeOther && (
                                        <div className={"option-container unselected"}>
                                            <div>
                                                <Icon name={"circle outline"}/>
                                                <span className="action">Other...</span>
                                            </div>
                                            <Icon className={"close-icon"} name={"x"} onClick={() =>
                                                setFieldValue("includeOther", false)
                                            }/>
                                        </div>
                                    )}
                                    <div className={"option-container unselected left-grouped"}>
                                        <Icon name={"circle outline"}/>
                                        <span>
                                            <span className="unselected action" onClick={() => {
                                                push('');
                                            }}>Add new answer</span>
                                            {!values.includeOther && (
                                                <span>
                                                    <span> or </span>
                                                    <span className="other" onClick={() =>
                                                        setFieldValue("includeOther", true)
                                                    }> add "Other"
                                                    </span>
                                                </span>
                                            )}
                                       </span>
                                    </div>
                                </div>
                            )}</FieldArray>
                        </Segment>
                    </Form>
                )}
            </Formik>
        );
    };
RadioButtonQuestionUI.defaultProps = {
    answers: ['']
};

export default RadioButtonQuestionUI;