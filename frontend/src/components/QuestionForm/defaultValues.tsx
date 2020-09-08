import React from "react";
import DateSelectionQuestionUI from "../ComponentsQuestions/DateSelectionQuestionUI";
import CheckboxQuestion from "../ComponentsQuestions/CheckboxQuestion";
import {QuestionType} from "../../models/forms/Questions/IQuesion";
import RadioButtonQuestionUI from "../ComponentsQuestions/RadioButtonQuestionUI";
import FreeTextQuestionUI from "../ComponentsQuestions/FreeTextQuestionUI";
import FileUploadQuestion from "../ComponentsQuestions/FileUploadQuestion";
import ScaleQuestion from "../ComponentsQuestions/ScaleQuestion";

export const defaultQuestionValues = {
  name: "Question without name",
  categoryTitle: "Question without title"
};
export function renderForm(question, handleQuestionDetailsUpdate) {
    switch (question.type) {
        case QuestionType.radio:
            return (
                <RadioButtonQuestionUI
                    value={question.details}
            onValueChange={handleQuestionDetailsUpdate}/>
        );
        case QuestionType.checkbox:
            return (
                <CheckboxQuestion
                    onValueChange={handleQuestionDetailsUpdate}
            value={question.details}
            />
        );
        case QuestionType.scale:
            return (
                <ScaleQuestion
                    onValueChange={handleQuestionDetailsUpdate}
            value={question.details}
            />
        );
        case QuestionType.freeText:
            return <FreeTextQuestionUI/>;
        case QuestionType.date:
            return <DateSelectionQuestionUI/>;
        case QuestionType.fileUpload:
            return <FileUploadQuestion
                onValueChange={handleQuestionDetailsUpdate}
            value={question.details}
            />;
        default:
            return <span>You should choose the type of the question :)</span>;
}
}
