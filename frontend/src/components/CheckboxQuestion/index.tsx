import React from "react";
import {FieldArray, FormikProps} from "formik";
import {Button, Form, Icon} from "semantic-ui-react";
import * as yup from 'yup';
import styles from './styles.module.sass';
import CustomInput from "./CustomInput";
import {strictEqual} from "assert";

interface ICheckboxQuestionProps {
    formik: FormikProps<any>;
}

const CheckboxQuestion: React.FunctionComponent<ICheckboxQuestionProps> = ({formik}) => {
    const buttons = push => (
        <div className={[styles.centerContent, styles.buttonContainer].join(' ')}>
            <button type='button'
                    onClick={() => {
                        push('');
                    }}
            >
                Add new option
            </button>

            <button type={'button'}
                    disabled={formik.values.includeOther}
                    onClick={() => formik.setFieldValue('includeOther', true)}
            >
                Add Other option
            </button>
        </div>
    );

    const otherOption = (
        <div className={styles.gridContainer}>
            <div className={[styles.centerContent, styles.whiteColored].join(' ')}>
                <Icon name='square outline'/>
            </div>
            <CustomInput
                disabled
                type="text"
                value={"Other..."}
            />
            <button
                className={styles.centerContent}
                type='button'
                onClick={() => formik.setFieldValue("includeOther", false)}
            >
                <Icon name={"x"}/>
            </button>
        </div>
    );

    return (
        <div className={styles.container}>
            <FieldArray name="answers">{({push, remove}) => (
                <div>
                    {formik.values.answers.map((answer, index) => (
                        <div key={index} className={styles.gridContainer}>
                            <div className={[styles.centerContent, styles.whiteColored].join(' ')}>
                                <Icon name='square outline'/>
                            </div>
                            <CustomInput
                                type="text"
                                placeholder="Type answer here..."
                                name={`answers.${index}`}
                                value={formik.values.answers[index]}
                                error={
                                    formik.touched.answers &&
                                    formik.errors.answers &&
                                    formik.touched.answers[index] &&
                                    formik.errors.answers[index] ?
                                        formik.errors.answers[index] : undefined
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.values.answers.length > 1 && (

                                <button
                                    className={styles.centerContent}
                                    type='button'
                                    onClick={() => remove(index)
                                    }>
                                    <Icon name={"x"}/>
                                </button>

                            )}
                        </div>
                    ))}

                    {formik.values.includeOther && otherOption}

                    {buttons(push)}
                </div>
            )}</FieldArray>

        </div>
    );
};

export default CheckboxQuestion;