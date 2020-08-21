import { ICheckboxQuestion } from "models/forms/Questions/IQuesion";
import { IQuestionResponse } from "models/IQuestionResponse";
import React, { FC, useState } from "react";
import { Checkbox, Input } from "semantic-ui-react";
import styles from "./styles.module.sass";
import {replaceAtIndex} from "../../../helpers/array.helper";

export const CheckboxResponse: FC<IQuestionResponse<ICheckboxQuestion>> = ({ question, answerHandler }) => {
    const [boxes, setBoxes]
        = useState(() => [...question.details.answerOptions.map(v => ({ checked: false, value: v }))
            , { checked: false, value: '' }]);

    const handleAnswer = () => {
        const boxesChecked = boxes.filter(v => v.checked && v.value);
        answerHandler?.(question.id, boxesChecked.length ? boxesChecked.map(v => v.value) : null);
    };

    return <div
        className={styles.boxes}>
        {boxes.map((v, i) => {
            return (i === boxes.length - 1 && question.details.includeOther)
                ? <div
                    className={styles.other}>
                    < Checkbox
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
                        className={styles.otherInput}
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
                : < Checkbox
                    label={v.value}
                    checked={boxes[i].checked}
                    onChange={() => {
                        setBoxes(() => {
                            const { checked, value } = boxes[i];
                            return replaceAtIndex(boxes, { checked: !checked, value }, i);
                        });
                        handleAnswer();
                    }
                    } />
                ;
        })
        }
    </div>;

};
