import { FreeTextResponse } from "components/ResponseQuestion/FreeTextResponse";
import { DateSelectionResponse } from "components/ResponseQuestion/DateSelectionResponse";
import { IQuestionResponse } from "models/IQuestionResponse";
import React from "react";
import {IDateQuestion, ITextQuestion} from "./IQuesion";

export default new Map([
    ['FREE_TEXT', ({ question, answerHandler }: IQuestionResponse<ITextQuestion>) => {
        return <FreeTextResponse question={question} answerHandler={answerHandler} />;
    }]
    // ['DATE', ({ question, answerHandler }: IQuestionResponse<IDateQuestion>) => {
    //     return <DateSelectionResponse question={question} answerHandler={answerHandler} />;
    // }]
    // ,['RADIO', ({ question, answerHandler }: IQuestionResponse) => {
    //    return <RadioResponse question={question} answerHandler={answerHandler} />;
    // }] and other...
]);

// my variant
// export default new Map<string, ({ question, answerHandler }: IQuestionResponse<any>) => any>([
//     ['FREE_TEXT', ({ question, answerHandler }: IQuestionResponse<ITextQuestion>) => {
//         return <FreeTextResponse question={question} answerHandler={answerHandler} />;
//     }],
//     ['DATE', ({ question, answerHandler }: IQuestionResponse<IDateQuestion>) => {
//         return <DateSelectionResponse question={question} answerHandler={answerHandler} />;
//     }]
//     // ,['RADIO', ({ question, answerHandler }: IQuestionResponse) => {
//     //    return <RadioResponse question={question} answerHandler={answerHandler} />;
//     // }] and other...
// ]);
