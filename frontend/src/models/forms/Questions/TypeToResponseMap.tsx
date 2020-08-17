import { FreeTextResponse } from "components/ResponseQuestion/FreeTextResponse";
import { IQuestionResponse } from "models/IQuestionResponse";
import React from "react";
import {IFileUploadQuestion, ITextQuestion} from "./IQuesion";
import FileUploadResponse from "../../../components/ResponseQuestion/FileUploadResponse";

export default new Map<string, any>([
    ['FREE_TEXT', ({ question, answerHandler }: IQuestionResponse<ITextQuestion>) => {
        return <FreeTextResponse question={question} answerHandler={answerHandler} />;
    }],
    ['FILE_UPLOAD', ({ question, answerHandler }: IQuestionResponse<IFileUploadQuestion>) => {
        return <FileUploadResponse question={question} answerHandler={answerHandler} />;
    }]
    // ,['RADIO', ({ question, answerHandler }: IQuestionResponse) => {
    //    return <RadioResponse question={question} answerHandler={answerHandler} />;
    // }] and other...

]);
