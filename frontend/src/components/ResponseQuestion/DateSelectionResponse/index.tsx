import React, { FC, useState } from 'react';
import { IQuestionResponse } from '../../../models/IQuestionResponse';
import { Button, Input, InputOnChangeData } from "semantic-ui-react";
import styles from '../FreeTextResponse/styles.module.sass';

export const DateSelectionResponse: FC<IQuestionResponse> = ({ question, answerHandler }) => {
  const [date, setDate] = useState('');

  const handleChange = (event, value: InputOnChangeData) => {
    console.log(value.value);
    setDate(value.value);
  };

  return (
    <>
      <Input type='date' value={date} onChange={handleChange} className={styles.input} />
      <Button content='Submit'
              disabled={!date}
              onClick={() => answerHandler?.(question.id, { payload: date })} />
    </>
  );
};