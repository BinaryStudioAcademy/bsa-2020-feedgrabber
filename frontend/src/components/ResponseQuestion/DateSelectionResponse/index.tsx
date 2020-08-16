import React, { FC, useState } from 'react';
import { IQuestionResponse } from '../../../models/IQuestionResponse';
import { Input, InputOnChangeData } from "semantic-ui-react";
import styles from '../FreeTextResponse/styles.module.sass';
import { IDateQuestion } from "../../../models/forms/Questions/IQuesion";
import UIButton from "../../UI/UIButton";

export const DateSelectionResponse: FC<IQuestionResponse<IDateQuestion>> = ({ question, answerHandler }) => {
  const [date, setDate] = useState('');

  const handleChange = (event, value: InputOnChangeData) => {
    console.log(value.value);
    setDate(value.value);
  };

  return (
    <>
      <Input type='date' value={date} onChange={handleChange} className={styles.input} />
      <UIButton title='Submit'
                disabled={!date}
                onClick={() => answerHandler?.(question.id, { payload: date })} />
    </>
  );
};