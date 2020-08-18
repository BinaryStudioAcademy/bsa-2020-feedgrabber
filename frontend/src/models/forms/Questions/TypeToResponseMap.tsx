import { FreeTextResponse } from "components/ResponseQuestion/FreeTextResponse";
import { DateSelectionResponse } from "components/ResponseQuestion/DateSelectionResponse";
import { ScaleQuestionResponse } from "components/ResponseQuestion/ScaleQuestionResponse";
import { IQuestionResponse } from "models/IQuestionResponse";
import RadioButtonResponse from "../../../components/ResponseQuestion/RadioButtonResponse";
import React from "react";
import {
    IRadioQuestion,
    IDateQuestion,
    ITextQuestion,
    ICheckboxQuestion,
    IFileUploadQuestion,
    IScaleQuestion
} from "./IQuesion";
import { CheckboxResponse } from "components/ResponseQuestion/CheckboxResponse";
import FileUploadResponse from "../../../components/ResponseQuestion/FileUploadResponse";

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
    ['SCALE', ({question, answerHandler}: IQuestionResponse<IScaleQuestion>) => {
        return <ScaleQuestionResponse question={question} answerHandler={answerHandler}/>;
    }],
    ['CHECKBOX', ({question, answerHandler}: IQuestionResponse<ICheckboxQuestion>) => {
        return <CheckboxResponse question={question} answerHandler={answerHandler}/>;
    }],
    ['FILE_UPLOAD', ({ question, answerHandler }: IQuestionResponse<IFileUploadQuestion>) => {
        return <FileUploadResponse question={question} answerHandler={answerHandler} />;
    }]
    // ,['RADIO', ({ question, answerHandler }: IQuestionResponse) => {
    //    return <RadioResponse question={question} answerHandler={answerHandler} />;
    // }] and other...
]);
