import React, { FC, useState } from 'react';
import { IQuestionResponse } from '../../../models/IQuestionResponse';
import { Input, InputOnChangeData } from "semantic-ui-react";
import styles from '../FreeTextResponse/styles.module.sass';
import { IDateQuestion } from "../../../models/forms/Questions/IQuesion";
import { IAnswerBody } from '../../../models/forms/Response/types';

export interface IDateSelectionResponse {
  response?: IAnswerBody;
}

export const DateSelectionResponse: FC<IQuestionResponse<IDateQuestion> & IDateSelectionResponse> = ({
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
    answerHandler?.(!error ?
      newDate
      : null);
  };

  return (
    <Input type='date' onChange={handleChange} className={styles.input} error={!!error}
           disabled={!!response && !answerHandler} defaultValue={response || ''}/>
  );
};
