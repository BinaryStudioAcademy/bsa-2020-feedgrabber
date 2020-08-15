import React, {useEffect, useState} from "react";
import { Form, Segment, Icon, Label } from "semantic-ui-react";
import {
  IGenericQuestionComponent,
  useInitValue,
  validState,
  invalidState
} from "../IQuestionInputContract";
import './styles.sass';
import {IMultiAnswerDetails} from "../../../models/forms/Questions/IQuesion";
import {replaceAtIndex} from "../../../helpers/array.helper";

const MultichoiseQuestion: IGenericQuestionComponent<IMultiAnswerDetails> = ({
  value: propValue,
  onValueChange
}) => {

  const value = useInitValue(
    { value: { answerOptions: [] }, isCompleted: false },
    propValue,
    onValueChange
  );

  const [isFieldTouched, setIsFieldTouched] = useState(value.answerOptions.map(a => true));

  function validate(details: IMultiAnswerDetails) {
    const valid = details.answerOptions
        .filter(a => (a.trim().length === 0) || (a.trim().length > 200))
        .length === 0;
    onValueChange(valid ? validState(details) : invalidState(details));
  }

  useEffect(() => validate(value), [value]);

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
              value={answer}
              error={isFieldTouched[index] &&
              (answer.trim().length === 0 || answer.trim().length > 200)}
              onChange={event => {
                setIsFieldTouched(replaceAtIndex(isFieldTouched, true, index));
                validate(
                    {
                      answerOptions: replaceAtIndex(
                          value.answerOptions,
                          event.target.value,
                          index
                      )
                    }
                );
              }}
              onBlur={() => setIsFieldTouched(replaceAtIndex(isFieldTouched, true, index))}
            />
            <Icon
              className={"close-icon unselected"}
              onClick={() => {
                validate(
                  {
                    answerOptions: value.answerOptions.filter(
                      (val, i) => i !== index
                    )
                  }
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
              setIsFieldTouched(isFieldTouched.concat(false));
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
