import React, { FC } from 'react';
import { IQuestionResponse } from "../../../models/IQuestionResponse";
import { IScaleQuestion } from "../../../models/forms/Questions/IQuesion";
import { Form, Radio } from 'semantic-ui-react';
import styles from './styles.module.sass';

export const ScaleQuestionResponse: FC<IQuestionResponse<IScaleQuestion>> =
  ({ question= { id: '23',  details: { min: 1, max: 8, minDescription: 'bad', maxDescription: 'good'} },
     answerHandler = null }) => {
  const handleClick = (e, value) => {
    answerHandler?.(question.id, value);
  };

  const getVariants = (min: number, max: number) => {
    const group = question.id;
    console.log(group);
    const variants = [];
    for (let i = min; i <= max; i++) {
      variants.push(
        <Form.Field className={styles.scale_question_response_variant} key={i}>
          <span>{i}</span>
          <Radio value={i} name={group} onChange={handleClick} />
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