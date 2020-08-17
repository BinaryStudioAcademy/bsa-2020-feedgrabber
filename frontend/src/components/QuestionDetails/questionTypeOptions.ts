import {QuestionType} from "../../models/forms/Questions/IQuesion";

export const questionTypeOptions = [
    {
        key: "Radio",
        text: "Radio",
        value: QuestionType.radio
    },
    {
        key: "CheckBoxes",
        text: "CheckBoxes",
        value: QuestionType.checkbox
    },
    {
        key: "Multichoice",
        text: "Multichoice",
        value: QuestionType.multichoice
    },
    {
        key: "TextArea",
        text: "TextArea",
        value: QuestionType.freeText
    },
    {
        key: "Scaled",
        text: "Scaled",
        value: QuestionType.scale
    },
    {
        key: "Date",
        text: "Date",
        value: QuestionType.date
    },
    {
        key: "fileUpload",
        text: "File upload",
        value: QuestionType.fileUpload
    }
];