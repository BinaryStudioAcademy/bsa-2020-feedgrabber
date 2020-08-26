import React, {FC, useEffect, useState} from "react";
import { Input, Radio } from "semantic-ui-react";
import styles from './styles.module.sass';
import { IQuestionResponse } from "../../../models/IQuestionResponse";
import { IRadioQuestion } from "../../../models/forms/Questions/IQuesion";
import { IAnswerBody } from '../../../models/forms/Response/types';

export interface IRadioResponse {
    response?: IAnswerBody;
}

const RadioButtonResponse: FC<IQuestionResponse<IRadioQuestion> & IRadioResponse> = ({
                                                                                         question,
                                                                                         answerHandler,
                                                                                         response
                                                                                     }) => {
    const [other, setOther] = useState<string>(() => {
        if (!response) {
            return '';
        }
        const answer = response as { selected?: string; other?: string };
        return answer.other || '';
    });
    const [otherIsInvalid, setOtherIsInvalid] = useState(true);
    const [answer, setAnswer] = useState(response as { selected?: string; other?: string } || null);

    useEffect(() => answerHandler?.({
        selected: answer?.selected,
        other: answer?.other
        // eslint-disable-next-line
    }), [answer]);

    const handleChange = (event, value?) => {
        setAnswer({ ...answer, selected: value?.value });
    };

    const handleOther = (value: string) => {
        if (value?.trim().length === 0 || value?.trim().length > 200) {
            setOther(null);
            setAnswer(null);
            setOtherIsInvalid(true);
            return;
        }
        setOtherIsInvalid(false);
        setOther(value);
        setAnswer({ ...answer, other: value});
    };

    return (
        <div>
            {question.details.answerOptions.map((option, index) => (
                <div className={styles.option_container} key={index}>
                    <Radio
                        disabled={!!response && !answerHandler}
                        checked={answer?.selected === option}
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
                        disabled={!!response && !answerHandler}
                        checked={answer?.other === other}
                        name='radioGroup'
                        value={other}
                        onChange={() => handleOther(other)}
                    />
                    <Input
                        disabled={!!response && !answerHandler}
                        className={styles.answer_input}
                        fluid
                        transparent
                        defaultValue={other}
                        placeholder="Or enter your variant here..."
                        error={answer === other && !!otherIsInvalid && !response}
                        onChange={event => handleOther(event.target.value)}
                    />
                </div>
            )}
        </div>
    );
};

export default RadioButtonResponse;
