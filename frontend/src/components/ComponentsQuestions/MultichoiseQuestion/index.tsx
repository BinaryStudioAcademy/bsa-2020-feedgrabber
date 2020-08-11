import React from "react";
import { Form, Segment, Icon, Label } from "semantic-ui-react";
import {
  IGenericQuestionComponent,
  useInitValue,
  validState,
  invalidState
} from "../IQuestionInputContract";
import { IMultiAnswerDetails } from "../../../models/IQuesion";

import "./style.scss";

// TODO: this will be common logic for multiple components, move it to shared folder
function replaceAtIndex<T>(arr: T[], val: T, index: number) {
  return [...arr.slice(0, index), val, ...arr.slice(index + 1)];
}

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
                  invalidState({
                    answerOptions: replaceAtIndex(
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
