import React, {FC, useEffect, useState} from "react";
import { Input, Radio } from "semantic-ui-react";

import styles from './styles.module.sass';
import { IQuestionResponse } from "../../../models/IQuestionResponse";
import { IRadioQuestion } from "../../../models/forms/Questions/IQuesion";

const RadioButtonResponse: FC<IQuestionResponse<IRadioQuestion>> = ({question, answerHandler}) => {
    const [other, setOther] = useState(() => {
        if (!question.answer) {
            return '';
        }
        const answ = question.answer;
        return question.details.answerOptions.find(answer => answer === answ) ? '' : answ;
    });
    const [otherIsInvalid, setOtherIsInvalid] = useState(true);
    const [answer, setAnswer] = useState(question.answer || question.details.answerOptions[0]);

    // useEffect(() => answerHandler?.(question.id, answer), [answer, answerHandler, question.id]);

    const handleChange = (event, value?) => {
        setAnswer(value?.value);
        answerHandler?.(question.id, answer);
    };

    const handleOther = (value: string) => {
        if (value.trim().length === 0 || value.trim().length > 200) {
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
                        disabled={!!question.answer}
                        checked={answer === option}
                        name='radioGroup'
                        value={option}
                        onChange={handleChange}
                    />
                    <Input disabled transparent fluid className={styles.answer_input} value={option}/>
                </div>
            ))}
            {question.details.includeOther && (
                <div className={styles.option_container}>
                    <Radio
                        disabled={!!question.answer}
                        checked={answer === other}
                        name='radioGroup'
                        onChange={handleChange}
                    />
                    <Input
                        disabled={!!question.answer}
                        className={styles.answer_input}
                        fluid
                        transparent
                        defaultValue={other}
                        placeholder="Or enter your variant here..."
                        error={answer === other && !!otherIsInvalid && !question.answer}
                        onChange={event => {
                            handleOther(event.target.value);
                        }
                        }/>
                </div>
            )}
        </div>
    );
};

export default RadioButtonResponse;
