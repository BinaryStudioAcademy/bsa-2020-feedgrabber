import { ICheckboxQuestion, ITextQuestion } from "models/forms/Questions/IQuesion";
import { IQuestionResponse } from "models/IQuestionResponse";
import React, { FC, useState } from "react";
import { Checkbox, Icon, Input } from "semantic-ui-react";
import styles from "./styles.module.sass";
import {replaceAtIndex} from "../../../helpers/array.helper";

export const CheckboxResponse: FC<IQuestionResponse<ICheckboxQuestion>> = ({ question, answerHandler }) => {
  const isAnswer = (field: string, options: string[]): boolean => {
    if (!options) {
      return false;
    }
    return !!options.find(option => option === field);
  };
  const findOther = (answers: string[], options: string[]): string => {
    if (!answers) {
      return '';
    }
    for (const str of answers) {
      if (!isAnswer(str, options)) {
        return str;
      }
    }
    return '';
  };

  const [boxes, setBoxes]
    = useState([...question.details.answerOptions.map(v => {
      return {
        checked: isAnswer(v, question.answer),
        value: v
      };
    })
    , {
        checked: (question.answer && question.details.includeOther),
        value: findOther(question.answer, question.details.answerOptions)
      }]);

  const handleAnswer = () => {
    const boxesChecked = boxes.filter(v => v.checked && v.value);
    answerHandler?.(question.id, boxesChecked.length ? boxesChecked.map(v => v.value) : null);
  };

  return <div className={styles.boxes}>
    {boxes.map((v, i) => {
      return (i === boxes.length - 1 && question.details.includeOther)
        ? <div className={styles.other}>
          <Checkbox disabled={!!question.answer}
                    checked={boxes[i].checked}
                    onChange={() => {
                      setBoxes(() => {
                        const { checked, value } = boxes[i];
                        return replaceAtIndex(boxes, { checked: !checked, value }, i);
                      });
                      handleAnswer();
                    }
                    } />
          <Input
            disabled={!!question.answer}
            className={styles.otherInput}
            defaultValue={boxes[i].value}
            placeholder='Other option...'
            error={boxes[i].checked && !boxes[i].value}
            onChange={(e, { value }) => {
              setBoxes(() => {
                const { checked } = boxes[i];
                return replaceAtIndex(boxes, { checked, value }, i);
              });
            }}
          />
        </div>
        : <Checkbox
            disabled={!!question.answer}
            label={v.value}
            checked={boxes[i].checked}
            onChange={() => {
              setBoxes(() => {
                const { checked, value } = boxes[i];
                return replaceAtIndex(boxes, { checked: !checked, value }, i);
              });
              handleAnswer();
            }
            }/>;
    })
    }
  </div>;
};
