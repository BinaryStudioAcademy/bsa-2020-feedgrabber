import {FreeTextResponse} from "components/ResponseQuestion/FreeTextResponse";
import {DateSelectionResponse} from "components/ResponseQuestion/DateSelectionResponse";
import {ScaleQuestionResponse} from "components/ResponseQuestion/ScaleQuestionResponse";
import {IQuestionResponse} from "models/IQuestionResponse";
import RadioButtonResponse from "../../../components/ResponseQuestion/RadioButtonResponse";
import React from "react";
import {
    IRadioQuestion, IDateQuestion, ITextQuestion,
    ICheckboxQuestion, IScaleQuestion, IFileUploadQuestion
} from "./IQuesion";
import {CheckboxResponse} from "components/ResponseQuestion/CheckboxResponse";
import FileUploadResponse from "../../../components/ResponseQuestion/FileUploadResponse";

export default new Map<string, ({question, answerHandler, response}: IQuestionResponse<any>) => any>([
    ['FREETEXT', ({question, answerHandler, response}: IQuestionResponse<ITextQuestion>) => {
        return <FreeTextResponse question={question} response={response} answerHandler={answerHandler}/>;
    }],
    ['DATE', ({question, answerHandler, response}: IQuestionResponse<IDateQuestion>) => {
        return <DateSelectionResponse question={question} response={response} answerHandler={answerHandler}/>;
    }],
    ['RADIO', ({question, answerHandler, response}: IQuestionResponse<IRadioQuestion>) => {
        return <RadioButtonResponse question={question} response={response} answerHandler={answerHandler}/>;
    }],
    ['SCALE', ({question, answerHandler, response}: IQuestionResponse<IScaleQuestion>) => {
        return <ScaleQuestionResponse question={question} response={response} answerHandler={answerHandler}/>;
    }],
    ['CHECKBOX', ({question, answerHandler, response}: IQuestionResponse<ICheckboxQuestion>) => {
        return <CheckboxResponse question={question} response={response} answerHandler={answerHandler}/>;
    }],
    ['FILEUPLOAD', ({question, answerHandler, response}: IQuestionResponse<IFileUploadQuestion>) => {
        return <FileUploadResponse question={question} response={response} answerHandler={answerHandler}/>;
    }]
]);
