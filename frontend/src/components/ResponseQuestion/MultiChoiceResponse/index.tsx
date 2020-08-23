import React from "react";
// import {IQuestionResponse} from "../../../models/IQuestionResponse";
// import {ICheckboxQuestion} from "../../../models/forms/Questions/IQuesion";
// import {FC, useState} from "react";
// import {Checkbox} from "semantic-ui-react";

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
