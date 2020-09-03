import React, {FC, useState} from "react";
import {IQuestionResponse} from "../../../models/IQuestionResponse";
import {ICheckboxQuestion} from "../../../models/forms/Questions/IQuesion";
import {Checkbox} from "semantic-ui-react";
import {IAnswerBody} from '../../../models/forms/Response/types';

// <<<<<<< HEAD
export interface IMultiChoiceResponse {
    response?: IAnswerBody;
}

export const MultiChoiceResponse: FC<IQuestionResponse<ICheckboxQuestion> & IMultiChoiceResponse> = ({
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

    const handleAnswer = () => {
        const boxesChecked = boxes.filter(v => v.checked && v.value);
        answerHandler
            ?.(boxesChecked.length
                ? {
                    selected: boxesChecked.map(v => v.value),
                    other: ''
                }
                : null
            );
    };

    return <>
        {question.details.answerOptions?.map((v, i) => {
            setBoxes([...boxes, {
              checked: isAnswer(v, (response as { selected: string[]; other: string })?.selected),
              value: v
            }]);
            console.log(boxes);
            return <Checkbox
                disabled={!!response}
                label={v}
                checked={boxes[i].checked}
                onChange={() => {
                    setBoxes(() => {
                        const { checked, value } = boxes[i];
                        const ret = boxes.slice(0);
                        ret[i] = { checked, value };
                        return ret;
                    });
                    handleAnswer();
                }
                } />;
        })}
    </>;
};
// =======
// export const MultiChoiceResponse: FC<IQuestionResponse<ICheckboxQuestion>> = ({ question, answerHandler }) => {
//     const [boxes, setBoxes] = useState([] as { checked: boolean; value: string }[]);
//     const handleAnswer = () => {
//         const boxesChecked = boxes.filter(v => v.checked);
//         answerHandler(question.id, boxesChecked.length ? boxesChecked.map(v => v.value) : null);
//     };
//     return <>
//         {question.details.answerOptions?.map((v, i) => {
//             setBoxes([...boxes, { checked: false, value: v }]);
//             console.log(boxes);
//             return <Checkbox
//                 label={v}
//                 checked={boxes[i].checked}
//                 onChange={() => {
//                     setBoxes(() => {
//                         const { checked, value } = boxes[i];
//                         const ret = boxes.slice(0);
//                         ret[i] = { checked, value };
//                         return ret;
//                     });
//                     handleAnswer();
//                 }
//                 } />;
//         })}
//     </>;
// };
// >>>>>>> ebcccacb5ccf3baaf3c5a8bae9dcd46e648769c1
