import React from 'react';
import {Form, Icon} from 'semantic-ui-react';
import './styles.sass';
import {FieldArray, FormikProps} from 'formik';

interface IRadioButtonQuestionUIProps {
    answers: string[];
    formik: FormikProps<any>;
}

const RadioButtonQuestionUI: React.FC<IRadioButtonQuestionUIProps> =
    ({answers, formik}) => {
        if (answers.length === 0) {
            answers.push('');
        }
        return (
            <FieldArray name="answers">{({push, remove}) => (
                <div>
                    {formik.values.answers.map((answer, index) => (
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
                                value={formik.values.answers[index]}
                                error={formik.touched.answers &&
                                formik.errors.answers &&
                                formik.touched.answers[index]
                                && formik.errors.answers[index] ?
                                    formik.errors.answers[index] : undefined}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.values.answers.length !== 1 && (
                                <Icon className={"close-icon unselected"} name={"x"} onClick={() =>
                                    remove(index)
                                }/>
                            )}
                        </div>
                    ))}
                    {formik.values.includeOther && (
                        <div className={"option-container unselected"}>
                            <div>
                                <Icon name={"circle outline"}/>
                                <span className="action">Other...</span>
                            </div>
                            <Icon className={"close-icon"} name={"x"} onClick={() =>
                                formik.setFieldValue("includeOther", false)
                            }/>
                        </div>
                    )}
                    <div className={"option-container unselected left-grouped"}>
                        <Icon name={"circle outline"}/>
                        <span>
                            <span className="unselected action" onClick={() => {
                                push('');
                            }}>Add new answer</span>
                            {!formik.values.includeOther && (
                                <span>
                                    <span> or </span>
                                    <span className="other" onClick={() =>
                                        formik.setFieldValue("includeOther", true)
                                    }> add "Other"
                                    </span>
                                </span>
                            )}
                       </span>
                    </div>
                </div>
            )}</FieldArray>
        );
    };
export default RadioButtonQuestionUI;