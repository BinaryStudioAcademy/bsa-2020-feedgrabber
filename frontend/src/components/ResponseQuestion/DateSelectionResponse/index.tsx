import React, { FC, useState } from 'react';
import { IQuestionResponse } from '../../../models/IQuestionResponse';
import { Input, InputOnChangeData } from "semantic-ui-react";
import styles from '../FreeTextResponse/styles.module.sass';
import { IDateQuestion } from "../../../models/forms/Questions/IQuesion";

export interface IDateSelectionResponse {
  response?: string;
}

export const DateSelectionResponse: FC<IQuestionResponse<IDateQuestion> & IDateSelectionResponse> = ({
  question,
  answerHandler,
  response
}) => {
  const [error, setError] = useState('');

  const handleChange = (event, value: InputOnChangeData) => {
    const newDate = value.value;
    if (!newDate) {
      setError('Cannot be blank');
      return;
    }
    setError('');
    answerHandler?.(question.id, !error ? value : null);
  };

  return (
    <Input type='date' onChange={handleChange} className={styles.input} error={!!error}
           disabled={!!response} defaultValue={response}/>
  );
};
