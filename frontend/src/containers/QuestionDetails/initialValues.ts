import * as IQuestion from "../../models/IQuesion";

export const Checkbox = (question: IQuestion.ICheckboxQuestion) => {
    return { name: question.name, answers: question.answerOptions };
};

export const Date = (question: IQuestion.IDateQuestion) => {
    return { name: question.name };
};

export const Scale = (question: IQuestion.IScaleQuestion) => {
    return { name: question.name };
};

export const FreeText = (question: IQuestion.ITextQuestion) => {
    return { name: question.name };
};

export const Radio = (question: IQuestion.IRadioQuestion) => {
    return { name: question.name, answers: question.answerOptions };
};

export const Multichoice = (question: IQuestion.IMultichoiceQuestion) => {
    return { name: question.name, answers: question.answerOptions };
};