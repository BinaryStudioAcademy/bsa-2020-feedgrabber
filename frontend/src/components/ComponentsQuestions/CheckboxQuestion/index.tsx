import React from "react";
import {FieldArray, FormikProps} from "formik";
import {Button, Form, Icon} from "semantic-ui-react";
import styles from './styles.module.sass';
import CustomInput from "./CustomInput";
import {IGenericQuestionComponent, invalidState, useInitValue} from "../IQuestionInputContract";
import {ICheckboxAnswerDetails} from "../../../models/forms/Questions/IQuesion";

// TODO: this will be common logic for multiple components, move it to shared folder
function replaceAtIndex<T>(arr: T[], val: T, index: number) {
    return [...arr.slice(0, index), val, ...arr.slice(index + 1)];
}

const CheckboxQuestion: IGenericQuestionComponent<ICheckboxAnswerDetails> = ({
value: propValue,
onValueChange
}) => {
    const value = useInitValue(
        {value: {answerOptions: [], includeOther: false}, isCompleted: false},
        propValue,
        onValueChange
    );

    const buttons = (
        <div className={[styles.centerContent, styles.buttonContainer].join(' ')}>
            <button type='button'
                    onClick={() => {
                        onValueChange(
                            invalidState({...value, answerOptions: value.answerOptions.concat("")})
                        );
                    }}
            >
                'Add new option'
            </button>

            <button type={'button'}
                    disabled={value.includeOther}
                    onClick={() => {
                        onValueChange(
                            invalidState({...value, includeOther: true})
                        );
                    }}
            >
                Add Other option
            </button>
        </div>
    );

    const otherOption = (
        <div className={styles.gridContainer}>
            <div className={[styles.centerContent, styles.whiteColored].join(' ')}>
                <Icon name='square outline' size='large'/>
            </div>
            <CustomInput
                disabled
                type="text"
                value={"Other..."}
            />
            <button
                className={styles.centerContent}
                type='button'
                onClick={() => {
                    onValueChange(
                        invalidState({...value, includeOther: false})
                    );
                }}
            >
                <Icon name='x'/>
            </button>
        </div>
    );

    return (
        <div className={styles.container}>
            <div>
                {value.answerOptions.map((answer, index) => (
                    <div key={index} className={styles.gridContainer}>
                        <div className={[styles.centerContent, styles.whiteColored].join(' ')}>
                            <Icon name='square outline' size='large'/>
                        </div>
                        <CustomInput
                            type="text"
                            placeholder="Type answer here..."
                            name={`answers.${index}`}
                            value={answer}
                            error={false} // TODO change this after adding validation
                            onChange={event => {
                                onValueChange(
                                    invalidState({
                                        ...value,
                                        answerOptions: replaceAtIndex(
                                            value.answerOptions,
                                            event.target.value,
                                            index
                                        )
                                    })
                                );
                            }}
                        />
                        {value.answerOptions.length > 1 && (

                            <button
                                className={styles.centerContent}
                                type='button'
                                onClick={() => {
                                    onValueChange(
                                        invalidState({
                                            ...value,
                                            answerOptions: value.answerOptions.filter(
                                                (val, i) => i !== index
                                            )
                                        })
                                    );
                                }}
                            >
                                <Icon name={"x"}/>
                            </button>

                        )}
                    </div>
                ))}

                {value.includeOther && otherOption}

                {buttons}
            </div>

        </div>
    );
};

export default CheckboxQuestion;
