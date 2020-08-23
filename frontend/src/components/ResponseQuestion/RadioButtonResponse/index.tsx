import React, { FC, useEffect, useState } from "react";
import { Input, Radio } from "semantic-ui-react";

import styles from './styles.module.sass';
import { IQuestionResponse } from "../../../models/IQuestionResponse";
import { IRadioQuestion, QuestionType } from "../../../models/forms/Questions/IQuesion";

const RadioButtonResponse: FC<IQuestionResponse<IRadioQuestion>> = ({ question, answerHandler }) => {
    const [other, setOther] = useState("");
    const [otherIsInvalid, setOtherIsInvalid] = useState(true);
    const [answer, setAnswer] = useState(null);

    // useEffect(() => answerHandler?.(question.id, answer), [answer, answerHandler, question.id]);

    const handleChange = (event, value?) => {
        setAnswer(value?.value);
        answerHandler?.({
            selected: answer,
            other
        });
    };

    const handleOther = (value: string) => {
        if (value?.trim().length === 0 || value.trim()?.length > 200) {
            setOther(null);
            setAnswer(null);
            setOtherIsInvalid(true);
            return;
        }
        setOtherIsInvalid(false);
        setOther(value);
        setAnswer(value);
    };

    return (
        <div>
            {question.details.answerOptions.map((option, index) => (
                <div className={styles.option_container} key={index}>
                    <Radio
                        checked={answer === option}
                        name='radioGroup'
                        value={option}
                        onChange={handleChange}
                    />
                    <Input disabled transparent fluid className={styles.answer_input} value={option} />
                </div>
            ))}
            {question.details.includeOther && (
                <div className={styles.option_container}>
                    <Radio
                        checked={answer === other}
                        name='radioGroup'
                        value={other}
                        onChange={() => handleOther(other)}
                    />
                    <Input
                        className={styles.answer_input}
                        fluid
                        transparent
                        placeholder="Or enter your variant here..."
                        error={answer === other && !!otherIsInvalid}
                        onChange={event => {
                            handleOther(event.target.value);
                        }
                        } />
                </div>
            )}
        </div>
    );
};

export default RadioButtonResponse;
