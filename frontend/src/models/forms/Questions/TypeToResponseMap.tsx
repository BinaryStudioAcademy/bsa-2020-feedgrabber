import {FreeTextResponse} from "components/ResponseQuestion/FreeTextResponse";
import {IQuestionResponse} from "models/IQuestionResponse";
import React from "react";
import {IRadioQuestion, ITextQuestion} from "./IQuesion";
import RadioButtonResponse from "../../../components/ResponseQuestion/RadioButtonResponse";

export default new Map<string, ({question, answerHandler}: IQuestionResponse<any>) => any>([
    ['FREE_TEXT', ({question, answerHandler}: IQuestionResponse<ITextQuestion>) => {
        return <FreeTextResponse question={question} answerHandler={answerHandler}/>;
    }],
    ['RADIO', ({question, answerHandler}: IQuestionResponse<IRadioQuestion>) => {
        return <RadioButtonResponse question={question} answerHandler={answerHandler}/>;
    }]
    // ,['RADIO', ({ question, answerHandler }: IQuestionResponse) => {
    //    return <RadioResponse question={question} answerHandler={answerHandler} />;
    // }] and other...
]);