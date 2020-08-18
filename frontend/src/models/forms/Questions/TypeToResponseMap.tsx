import { FreeTextResponse } from "components/ResponseQuestion/FreeTextResponse";
import { DateSelectionResponse } from "components/ResponseQuestion/DateSelectionResponse";
import { IQuestionResponse } from "models/IQuestionResponse";
import RadioButtonResponse from "../../../components/ResponseQuestion/RadioButtonResponse";
import React from "react";
import {IRadioQuestion, IDateQuestion, ITextQuestion, ICheckboxQuestion} from "./IQuesion";
import { CheckboxResponse } from "components/ResponseQuestion/CheckboxResponse";

export default new Map<string, ({ question, answerHandler }: IQuestionResponse<any>) => any>([
    ['FREE_TEXT', ({ question, answerHandler }: IQuestionResponse<ITextQuestion>) => {
        return <FreeTextResponse question={question} answerHandler={answerHandler} />;
    }],
    ['DATE', ({ question, answerHandler }: IQuestionResponse<IDateQuestion>) => {
        return <DateSelectionResponse question={question} answerHandler={answerHandler} />;
    }],
    ['RADIO', ({question, answerHandler}: IQuestionResponse<IRadioQuestion>) => {
        return <RadioButtonResponse question={question} answerHandler={answerHandler}/>;
    }],
    ['CHECKBOX', ({question, answerHandler}: IQuestionResponse<ICheckboxQuestion>) => {
        return <CheckboxResponse question={question} answerHandler={answerHandler}/>;
    }]
    // ,['RADIO', ({ question, answerHandler }: IQuestionResponse) => {
    //    return <RadioResponse question={question} answerHandler={answerHandler} />;
    // }] and other...
]);