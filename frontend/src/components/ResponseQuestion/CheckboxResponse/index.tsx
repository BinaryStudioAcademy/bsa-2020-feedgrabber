import { ICheckboxQuestion, QuestionType } from "models/forms/Questions/IQuesion";
import { IQuestionResponse } from "models/IQuestionResponse";
import React, { FC, useEffect, useState } from "react";
import { Checkbox, Input } from "semantic-ui-react";
import styles from "./styles.module.sass";
import { replaceAtIndex } from "../../../helpers/array.helper";

export const CheckboxResponse: FC<IQuestionResponse<ICheckboxQuestion>> = ({ question, answerHandler }) => {
    const [boxes, setBoxes] = useState([] as { checked: boolean; value: string }[]);
    const [other, setOther] = useState({ checked: false, value: null });

    useEffect(() => {
        setBoxes(question.details.answerOptions.map(v => ({ checked: false, value: v })));
    }, [question]);

    // eslint-disable-next-line
    useEffect(() => { handleAnswer(); }, [boxes, other]);

    const handleAnswer = () => {
        const boxesChecked = boxes.filter(v => v.checked && v.value);
        answerHandler
            ?.(!boxesChecked.length || (other.checked && !other.value)
                ? null
                : {
                    selected: boxesChecked.map(v => v.value),
                    other: other.checked ? other.value : null
                }
            );
    };

    return <div
        className={styles.boxes}>
        {boxes.map((v, i) => {
            return < Checkbox
                label={v.value}
                checked={boxes[i].checked}
                onChange={() => {
                    setBoxes(() => {
                        const { checked, value } = boxes[i];
                        return replaceAtIndex(boxes, { checked: !checked, value }, i);
                    });
                    // handleAnswer();
                }
                } />
                ;

        })
        }
        {question.details.includeOther &&
            <div
                className={styles.other}>
                < Checkbox
                    checked={other.checked}
                    onChange={() => {
                        setOther(() => {
                            const { checked, value } = other;
                            return ({ checked: !checked, value });
                        });
                        // handleAnswer();
                    }
                    } />
                <Input
                    className={styles.otherInput}
                    placeholder='Other option...'
                    error={other.checked && !other.value}
                    onChange={(e, { value }) => {
                        setOther(() => {
                            const { checked } = other;
                            return ({ checked, value });
                        });
                    }}
                />
            </div>}
    </div>;

};
