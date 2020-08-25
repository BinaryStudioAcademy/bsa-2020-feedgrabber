import { ITextQuestion, QuestionType } from "models/forms/Questions/IQuesion";
import { IQuestionResponse } from "models/IQuestionResponse";
import React, { FC, useState } from "react";
import { Input, InputOnChangeData } from "semantic-ui-react";
import { IAnswerBody } from '../../../models/forms/Response/types';
import styles from "./styles.module.sass";

export interface IFreeTextResponse {
    response?: IAnswerBody;
}

export const FreeTextResponse: FC<IQuestionResponse<ITextQuestion> & IFreeTextResponse> = ({
    question,
    answerHandler,
    response
}) => {
    const [invalidMessage, setInvalidMessage] = useState('');

    const validate = (value: string) => {
        value.trim() ? setInvalidMessage('') : setInvalidMessage('Cannot be blank');
    };

    const handleChange = (e, v: InputOnChangeData) => {
        const { value } = v;
        validate(value);
        answerHandler?.(!invalidMessage ? value : null);
    };
    return <Input
        onChange={handleChange}
        placeholder='Answer field'
        disabled={!!response}
        defaultValue={response || ''}
        error={!!invalidMessage}
        className={styles.input}
    />;
};
