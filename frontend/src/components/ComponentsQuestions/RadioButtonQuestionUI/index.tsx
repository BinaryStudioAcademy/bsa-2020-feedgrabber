import React, {useEffect, useState} from "react";
import {Form, Icon} from "semantic-ui-react";
import './styles.sass';
import {
    IGenericQuestionComponent, invalidState,
    useInitValue,
    validState
} from "../IQuestionInputContract";
import {IRadioButtonAnswerDetails} from "../../../models/forms/Questions/IQuesion";
import {replaceAtIndex} from "../../../helpers/array.helper";

const RadioButtonQuestionUI: IGenericQuestionComponent<IRadioButtonAnswerDetails> = ({
                                                                                         value: propValue, onValueChange
                                                                                     }) => {
    const value = useInitValue(
        {value: {answerOptions: ["Option 1"], includeOther: false}, isCompleted: false},
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => validate(value), [value]);

    return (
        <div>
            {value.answerOptions.map((answer, index) => (
                <div className={"option-container"} key={index}>
                    <Form.Input
                        className={"answer-input"}
                        fluid
                        icon="circle outline"
                        transparent
                        iconPosition="left"
                        placeholder="Type answer here..."
                        type="text"
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
                        onBlur={() => {
                            if(answer.trim().length === 0) {
                                validate(
                                    {
                                        answerOptions: replaceAtIndex(
                                            value.answerOptions,
                                            `Option ${index + 1}`,
                                            index
                                        ),
                                        includeOther: value.includeOther
                                    }
                                );
                            }
                            setIsFieldTouched(replaceAtIndex(isFieldTouched, true, index));
                        }}
                    />
                    {value.answerOptions.length !== 1 && (
                        <Icon className={"close-icon unselected"} name={"x"} onClick={() => {
                            validate(
                                {
                                    answerOptions: value.answerOptions.filter(
                                        (val, i) => i !== index
                                    ),
                                    includeOther: value.includeOther
                                }
                            );
                        }}/>
                    )}
                </div>
            ))}
            {value.includeOther && (
                <div className={"option-container unselected"}>
                    <div>
                        <Icon className="action" name={"circle outline"}/>
                        <span>Other...</span>
                    </div>
                    <Icon className={"close-icon"} name={"x"} onClick={() => {
                        onValueChange(
                            validState({
                                answerOptions: value.answerOptions,
                                includeOther: false
                            })
                        );
                    }
                    }/>
                </div>
            )}
            {(value.answerOptions.length!==10 || !value.includeOther)&&
            <div className={"option-container unselected left-grouped"}>
                <Icon className="action" name={"circle outline"}/>
                <span>
                    {value.answerOptions.length!==10 &&
                    <span onClick={() => {
                        onValueChange(
                            validState({
                                answerOptions: value.answerOptions.concat(`Option ${value.answerOptions.length + 1}`),
                                includeOther: value.includeOther
                            })
                        );
                        setIsFieldTouched(isFieldTouched.concat(false));
                    }}>Add new answer</span>}
                    {!value.includeOther && (
                        <span>
                            {value.answerOptions.length!==10 && <span> or </span>}
                           <span className="other" onClick={() => {
                               onValueChange(
                                   validState({
                                       answerOptions: value.answerOptions,
                                       includeOther: true
                                   })
                               );
                           }
                           }> add "Other"
                           </span>
                        </span>
                    )}
                </span>
            </div>}
        </div>

    );
};

export default RadioButtonQuestionUI;