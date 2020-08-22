import { ITextQuestion, QuestionType } from "models/forms/Questions/IQuesion";
import { IQuestionResponse } from "models/IQuestionResponse";
import React, { FC, useState } from "react";
import { Input, InputOnChangeData } from "semantic-ui-react";
import styles from "./styles.module.sass";

export const FreeTextResponse: FC<IQuestionResponse<ITextQuestion>> = ({ question, answerHandler }) => {
    const [invalidMessage, setInvalidMessage] = useState('');

    const validate = (value: string) => {
        value.trim() ? setInvalidMessage('') : setInvalidMessage('Cannot be blank');
    };

    const handleChange = (e, v: InputOnChangeData) => {
        const { value } = v;
        validate(value);
        answerHandler?.(!invalidMessage ? {
            questionId: question.id,
            body: value,
            type: QuestionType.freeText
        } : null);
    };
    return <Input
        onChange={handleChange}
        placeholder='Answer field'
        error={!!invalidMessage}
        className={styles.input}
    />;
};