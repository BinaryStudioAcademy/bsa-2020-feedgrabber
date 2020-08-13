import { FreeTextResponse } from "components/ResponseQuestion/FreeTextResponse";
import { IQuestionResponse } from "models/IQuestionResponse";
import React, { FC } from "react";
import { IQuestion } from "./IQuesion";

export default new Map([
    ['FREE_TEXT', ({ question, answerHandler }: IQuestionResponse) => {
        return <FreeTextResponse question={question} answerHandler={answerHandler} />;
    }]
    // ,['RADIO', Object.assign({}, <RadioResponse question={null} />)]
    // ,['SCALE', Object.assign({}, <ScaleResponse question={null} />)]
    // ,['CHECKBOX', Object.assign({}, <CheckBoxResponse question={null} />)]
    // ,['MULTI_CHOICE', Object.assign({}, <MultiChoiceResponse question={null} />)]
    // ,['DATE', Object.assign({}, <DateResponse question={null} />)]
]);