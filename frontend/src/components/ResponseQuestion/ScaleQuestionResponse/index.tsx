import React, { FC } from 'react';
import { IQuestionResponse } from "../../../models/IQuestionResponse";
import { IScaleQuestion } from "../../../models/forms/Questions/IQuesion";
import { Form, Radio } from 'semantic-ui-react';

export const ScaleQuestionResponse: FC<IQuestionResponse<IScaleQuestion>> =
  ({ question= { details: { min: 1, max: 8, minDescription: 'bad', maxDescription: 'good'} },
     answerHandler = null }) => {
  const getVariants = (min: number, max: number) => {
    const variants = [];
    for (let i = min; i <= max; i++) {
      variants.push(
        <Form.Field>
          <span>{i}</span>
          <Radio value={i} />
        </Form.Field>
      );
    }
    return variants;
  };

  return (
    <Form>
      <span>{question.details.minDescription}</span>
      {getVariants(question.details.min, question.details.max)}
      <span>{question.details.maxDescription}</span>
    </Form>
  );
};