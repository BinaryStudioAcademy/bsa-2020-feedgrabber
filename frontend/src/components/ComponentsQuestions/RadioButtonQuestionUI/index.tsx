import React, {useState} from "react";
import {Form, Icon} from "semantic-ui-react";
import './styles.sass';
import {
    IGenericQuestionComponent,
    useInitValue,
    validState
} from "../IQuestionInputContract";
import {IRadioButtonAnswerDetails} from "../../../models/IQuesion";

// TODO: this will be common logic for multiple components, move it to shared folder
function replaceAtIndex<T>(arr: T[], val: T, index: number) {
    return [...arr.slice(0, index), val, ...arr.slice(index + 1)];
}

const RadioButtonQuestionUI: IGenericQuestionComponent<IRadioButtonAnswerDetails> = ({
                                                                                         value: propValue, onValueChange
                                                                                     }) => {
    const [includeOther, setIncludeOther] = useState(false);
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
                                    includeOther: includeOther
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
                                    includeOther: includeOther
                                })
                            );
                        }}/>
                    )}
                </div>
            ))}
            {includeOther && (
                <div className={"option-container unselected"}>
                    <div>
                        <Icon name={"circle outline"}/>
                        <span className="action">Other...</span>
                    </div>
                    <Icon className={"close-icon"} name={"x"} onClick={() => {
                        setIncludeOther(false);
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
                                includeOther: includeOther
                            })
                        );
                    }}>Add new answer</span>
                    {!includeOther && (
                        <span>
                           <span> or </span>
                           <span className="other" onClick={() => {
                               setIncludeOther(true);
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

{/* <Segment>
            <div>
              {value.answerOptions.map((answer, index) => (
                    <div className="option-container" key={index}>
                        <Form.Input
                            className="answer-input"
                            fluid
                            icon="check square outline"
                            transparent
                            iconPosition="left"
                            placeholder="Type answer here..."
                            type="text"
                            name={`answers.${index}`}
                            value={answer}
                            error={answer.trim().length === 0}
                            onChange={event => {
                                onValueChange(
                                    invalidState({
                                        answerOptions: replaceAtIndex(
                                            value.answerOptions,
                                            event.target.value,
                                            index
                                        ),
                                        includeOther: false
                                    })
                                );
                            }}
                        />
                        <Icon
                            className={"close-icon unselected"}
                            name={"remove"}
                            onClick={() => {
                                onValueChange(
                                    invalidState({
                                        answerOptions: value.answerOptions.filter(
                                            (val, i) => i !== index
                                        ),
                                        includeOther: false
                                    })
                                );
                            }}
                        />
                    </div>
                ))}
                <div className={"option-container unselected left-grouped"}>
                    <Icon name={"check square outline"}/>
                    <span
                        className="check square outline"
                        onClick={() => {
                            onValueChange(
                                invalidState({
                                    answerOptions: value.answerOptions.concat(""),
                                    includeOther: false
                                })
                            );
                        }}
                    >
            Add new answer
          </span>
                </div>
            </div>
        </Segment>*/
}