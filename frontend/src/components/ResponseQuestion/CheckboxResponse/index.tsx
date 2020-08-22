import { ICheckboxQuestion, IQuestion } from "models/forms/Questions/IQuesion";
import { IQuestionResponse } from "models/IQuestionResponse";
import React, { FC, useEffect, useState } from "react";
import { Checkbox, Input } from "semantic-ui-react";
import styles from "./styles.module.sass";
import { replaceAtIndex } from "../../../helpers/array.helper";

export const CheckboxResponse: FC<IQuestionResponse<ICheckboxQuestion>> = ({ question, answerHandler }) => {
    const [boxes, setBoxes] = useState([] as { checked: boolean; value: string }[]);
    // const [other, setOther] = useState({ checked: false, value: null });

    useEffect(() => {
        setBoxes([...question.details.answerOptions.map(v => ({ checked: false, value: v }))
            , question.details.includeOther && { checked: false, value: '' }]);
    }, [setBoxes]);

    const handleAnswer = () => {
        const boxesChecked = boxes.filter(v => v.checked && v.value);
        answerHandler
            ?.(boxesChecked.length
                ? { questionId: question.id, value: boxesChecked.map(v => v.value) }
                : null
            );
    };

    return <div
        className={styles.boxes}>
        {boxes.map((v, i) => {
            return (i !== boxes.length - 1) &&
                < Checkbox
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
        {question.details.includeOther &&
            <div
                className={styles.other}>
                < Checkbox
                    checked={boxes[boxes.length - 1]?.checked}
                    onChange={() => {
                        setBoxes(() => {
                            const { checked, value } = boxes?.[boxes.length - 1];
                            return replaceAtIndex(boxes, { checked: !checked, value }, boxes?.length - 1);
                        });
                        handleAnswer();
                    }
                    } />
                <Input
                    className={styles.otherInput}
                    placeholder='Other option...'
                    error={boxes?.[boxes.length - 1]?.checked && !boxes?.[boxes.length - 1].value}
                    onChange={(e, { value }) => {
                        setBoxes(() => {
                            const { checked } = boxes?.[boxes.length - 1];
                            return replaceAtIndex(boxes, { checked, value }, boxes.length - 1);
                        });
                    }}
                />
            </div>}
    </div>;

};
