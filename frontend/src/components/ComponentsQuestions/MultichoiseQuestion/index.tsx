import React from "react";
import { Form, Segment, Icon, Label } from "semantic-ui-react";
import {
  IGenericQuestionComponent,
  useInitValue,
  validState,
  invalidState
} from "../IQuestionInputContract";
import './styles.sass';
import {IMultiAnswerDetails} from "../../../models/forms/Questions/IQuesion";
import ReplaceAtIndex from 'models/ReplaceAtIndex';

const MultichoiseQuestion: IGenericQuestionComponent<IMultiAnswerDetails> = ({
  value: propValue,
  onValueChange
}) => {
  const value = useInitValue(
    { value: { answerOptions: [] }, isCompleted: false },
    propValue,
    onValueChange
  );

  return (
    <Segment>
      <div>
        {value.answerOptions.map((answer, index) => (
          <div className="option-container" key={index}>
            <Form.Input
              className="answer-input"
              fluid
              icon="check square outline"
              transparent
              iconPosition="left"
              placeholder="Type answer here..."
              type="text"
              name={`answers.${index}`}
              value={answer}
              onChange={event => {
                onValueChange(
                  validState({
                    answerOptions: ReplaceAtIndex(
                      value.answerOptions,
                      event.target.value,
                      index
                    )
                  })
                );
              }}
            />
            <Icon
              className={"close-icon unselected"}
              name={"remove"}
              onClick={() => {
                onValueChange(
                  invalidState({
                    answerOptions: value.answerOptions.filter(
                      (val, i) => i !== index
                    )
                  })
                );
              }}
            />
          </div>
        ))}
        <div className={"option-container unselected left-grouped"}>
          <Icon name={"check square outline"} />
          <span
            className="check square outline"
            onClick={() => {
              onValueChange(
                invalidState({ answerOptions: value.answerOptions.concat("") })
              );
            }}
          >
            Add new answer
          </span>
        </div>
      </div>
    </Segment>
  );
};

export default MultichoiseQuestion;
