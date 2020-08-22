import React, { FC, useState } from 'react';
import { IQuestionResponse } from "../../../models/IQuestionResponse";
import { IScaleQuestion, QuestionType } from "../../../models/forms/Questions/IQuesion";
import { Form, Radio } from 'semantic-ui-react';
import { IAnswerBody } from '../../../models/forms/Response/types';

import styles from './styles.module.sass';

export interface IScaleResponse {
  response?: IAnswerBody;
}

export const ScaleQuestionResponse: FC<IQuestionResponse<IScaleQuestion> & IScaleResponse> = (
  {
    question= {
      id: '23',
      details: { min: 1, max: 8, minDescription: 'bad', maxDescription: 'good'},
      answer: 4
    },
    answerHandler,
    response
  }) => {
  // const [answer, setAnswer] = useState(response.body || question.answer);

  const handleClick = (e, value) => {
    answerHandler?.(value ? value : null);
  };

  const getVariants = (min: number, max: number) => {
    const group = question.id;
    const variants = [];
    for (let i = min; i <= max; i++) {
      variants.push(
        <Form.Field className={styles.scale_question_response_variant} key={i}>
          <span>{i}</span>
          <Radio value={i}
                 name={group}
                 onChange={handleClick}
                 disabled={!!response}
                 checked={!!response && response === i} />
        </Form.Field>
      );
    }
    return variants;
  };

  return (
    <Form className={styles.scale_question_response_form}>
      <span className={styles.scale_question_response_description}>
        {question.details.minDescription}
      </span>
      {getVariants(question.details.min, question.details.max)}
      <span className={styles.scale_question_response_description}>
        {question.details.maxDescription}
      </span>
    </Form>
  );
};
