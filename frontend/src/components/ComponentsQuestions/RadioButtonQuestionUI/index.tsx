import React from "react";
import {Form, Icon} from "semantic-ui-react";
import './styles.sass';
import {
    IGenericQuestionComponent,
    useInitValue,
    validState
} from "../IQuestionInputContract";
import {IRadioButtonAnswerDetails} from "../../../models/forms/Questions/IQuesion";

// TODO: this will be common logic for multiple components, move it to shared folder
function replaceAtIndex<T>(arr: T[], val: T, index: number) {
    return [...arr.slice(0, index), val, ...arr.slice(index + 1)];
}

const RadioButtonQuestionUI: IGenericQuestionComponent<IRadioButtonAnswerDetails> = ({
                                                                                         value: propValue, onValueChange
                                                                                     }) => {
    const value = useInitValue(
        {value: {answerOptions: [], includeOther: false}, isCompleted: false},
        propValue,
        onValueChange
    );

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
                        value={value.answerOptions[index]}
                        error={answer.trim().length === 0}
                        onChange={event => {
                            onValueChange(
                                validState({
                                    answerOptions: replaceAtIndex(
                                        value.answerOptions,
                                        event.target.value,
                                        index
                                    ),
                                    includeOther: value.includeOther
                                })
                            );
                        }}
                    />
                    {value.answerOptions.length !== 1 && (
                        <Icon className={"close-icon unselected"} name={"x"} onClick={() => {
                            onValueChange(
                                validState({
                                    answerOptions: value.answerOptions.filter(
                                        (val, i) => i !== index
                                    ),
                                    includeOther: value.includeOther
                                })
                            );
                        }}/>
                    )}
                </div>
            ))}
            {value.includeOther && (
                <div className={"option-container unselected"}>
                    <div>
                        <Icon name={"circle outline"}/>
                        <span className="action">Other...</span>
                    </div>
                    <Icon className={"close-icon"} name={"x"} onClick={() => {
                        onValueChange(
                            validState({answerOptions: value.answerOptions, includeOther: false})
                        );
                    }
                    }/>
                </div>
            )}
            <div className={"option-container unselected left-grouped"}>
                <Icon name={"circle outline"}/>
                <span>
                    <span className="unselected action" onClick={() => {
                        onValueChange(
                            validState({
                                answerOptions: value.answerOptions.concat(""),
                                includeOther: value.includeOther
                            })
                        );
                    }}>Add new answer</span>
                    {!value.includeOther && (
                        <span>
                           <span> or </span>
                           <span className="other" onClick={() => {
                               onValueChange(
                                   validState({answerOptions: value.answerOptions, includeOther: true})
                               );
                           }
                           }> add "Other"
                           </span>
                        </span>
                    )}
                </span>
            </div>
        </div>

    )
        ;
};

export default RadioButtonQuestionUI;
