import React, {FC, useEffect, useState} from "react";
import { Input, Radio } from "semantic-ui-react";
import styles from './styles.module.sass';
import { IQuestionResponse } from "../../../models/IQuestionResponse";
import { IRadioQuestion } from "../../../models/forms/Questions/IQuesion";

export interface IRadioResponse {
    response?: string;
}

const RadioButtonResponse: FC<IQuestionResponse<IRadioQuestion> & IRadioResponse> = ({
    question,
    answerHandler,
    response
}) => {
    const [other, setOther] = useState(() => {
        if (!response) {
            return '';
        }
        const answ = response;
        return question.details.answerOptions.find(answer => answer === answ) ? '' : answ;
    });
    const [otherIsInvalid, setOtherIsInvalid] = useState(true);
    const [answer, setAnswer] = useState(response || question.details.answerOptions[0]);

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
                        disabled={!!response}
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
                        disabled={!!response}
                        checked={answer === other}
                        name='radioGroup'
                        onChange={handleChange}
                    />
                    <Input
                        disabled={!!response}
                        className={styles.answer_input}
                        fluid
                        transparent
                        defaultValue={other}
                        placeholder="Or enter your variant here..."
                        error={answer === other && !!otherIsInvalid && !response}
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
