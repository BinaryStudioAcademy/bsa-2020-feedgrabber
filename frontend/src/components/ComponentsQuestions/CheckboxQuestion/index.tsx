import React, {useEffect, useState} from "react";
import {Form, Icon} from "semantic-ui-react";
import styles from './styles.module.sass';
import CustomInput from "./CustomInput";
import {IGenericQuestionComponent, invalidState, useInitValue, validState} from "../IQuestionInputContract";
import {ICheckboxAnswerDetails, IRadioButtonAnswerDetails} from "../../../models/forms/Questions/IQuesion";
import {replaceAtIndex} from "../../../helpers/array.helper";

const CheckboxQuestion: IGenericQuestionComponent<ICheckboxAnswerDetails> = ({
value: propValue,
onValueChange
}) => {

    const value = useInitValue(
        {value: {answerOptions: [], includeOther: false}, isCompleted: false},
        propValue,
        onValueChange
    );

    const [isFieldTouched, setIsFieldTouched] = useState(value.answerOptions.map(a => true));

    function validate(details: IRadioButtonAnswerDetails) {
        const valid = details.answerOptions
            .filter(a => (a.trim().length === 0) || (a.trim().length > 200))
            .length === 0;
        onValueChange(valid ? validState(details) : invalidState(details));
    }

    useEffect(() => validate(value), [value]);

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
                        setIsFieldTouched(isFieldTouched.concat(false));
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
                            error={isFieldTouched[index] &&
                            (answer.trim().length === 0 || answer.trim().length > 200)}
                            onChange={event => {
                                setIsFieldTouched(replaceAtIndex(isFieldTouched, true, index));
                                validate(
                                    {
                                        answerOptions: replaceAtIndex(
                                            value.answerOptions,
                                            event.target.value,
                                            index
                                        ),
                                        includeOther: value.includeOther
                                    }
                                );
                            }}
                            onBlur={() => setIsFieldTouched(replaceAtIndex(isFieldTouched, true, index))}
                        />
                        {value.answerOptions.length > 1 && (
                            <button
                                className={styles.centerContent}
                                type='button'
                                onClick={() => {
                                    validate(
                                        {
                                            answerOptions: value.answerOptions.filter(
                                                (val, i) => i !== index
                                            ),
                                            includeOther: value.includeOther
                                        }
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
