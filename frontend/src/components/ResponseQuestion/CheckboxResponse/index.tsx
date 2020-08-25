import { ICheckboxQuestion } from "models/forms/Questions/IQuesion";
import { IQuestionResponse } from "models/IQuestionResponse";
import React, { FC, useEffect, useState } from "react";
import { Checkbox, Input } from "semantic-ui-react";
import styles from "./styles.module.sass";
import { replaceAtIndex } from "../../../helpers/array.helper";
import { IAnswerBody } from '../../../models/forms/Response/types';

export  interface ICheckboxResponse {
    response?: IAnswerBody;
}

export const CheckboxResponse: FC<IQuestionResponse<ICheckboxQuestion> & ICheckboxResponse> = ({
                                                                                                   question,
                                                                                                   answerHandler,
                                                                                                   response
                                                                                               }) => {
    const isAnswer = (field: string, options: string[]): boolean => {
        if (!options) {
            return false;
        }
        return !!options.find(option => option === field);
    };
    const [boxes, setBoxes] = useState([] as { checked: boolean; value: string }[]);
    useEffect(() => {
        setBoxes(question.details.answerOptions.map(v => ({
            checked: isAnswer(v, (response as { selected: string[]; other: string })?.selected),
            value: v
        })));
    }, [question.details.answerOptions, response, setBoxes]); // in dev only [question]

    const [other, setOther] = useState({
        checked: ((response as { selected: string[]; other: string })?.other && question.details.includeOther),
        value: (response as { selected: string[]; other: string })?.other || ''
    });

    const handleAnswer = () => {
        const boxesChecked = boxes.filter(v => v.checked && v.value);
        answerHandler
            ?.(boxesChecked.length
                ? {
                    selected: boxesChecked.map(v => v.value),
                    other: other.value || null
                }
                : null
            );
    };

    return (
        <div className={styles.boxes}>
            {boxes.map((v, i) => {
                return <Checkbox disabled={response !== undefined}
                                 label={v.value}
                                 checked={boxes[i].checked}
                                 onChange={() => {
                                     setBoxes(() => {
                                         const {checked, value} = boxes[i];
                                         return replaceAtIndex(boxes, {checked: !checked, value}, i);
                                     });
                                     handleAnswer();
                                 }
                                 }/>;
            })}
            {question.details.includeOther && (
                <div className={styles.other}>
                    <Checkbox
                        disabled={response !== undefined}
                        checked={other.checked}
                        onChange={() => {
                            setOther(() => {
                                const {checked, value} = other;
                                return ({checked: !checked, value});
                            });
                            handleAnswer();
                        }
                        }/>
                    <Input
                        disabled={response !== undefined}
                        className={styles.otherInput}
                        defaultValue={other.value}
                        placeholder='Other option...'
                        error={other.checked && !other.value}
                        onChange={(e, {value}) => {
                            setOther(() => {
                                const {checked} = other;
                                return ({checked, value});
                            });
                        }}
                    />
                </div>
            )}
        </div>
    );
};
