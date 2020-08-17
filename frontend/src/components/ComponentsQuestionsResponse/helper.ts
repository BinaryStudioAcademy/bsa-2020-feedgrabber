import { IQuestion } from '../../models/forms/Questions/IQuesion';
import { IComponentState } from "./IComponentProps";

export function getValidAnswer<T>(question: IQuestion, answer: string | string[] | number): IComponentState {
    question["answer"] = answer;
    return {
        question: question,
        isAnswered: true
    };
}

export function getInvalidAnswer(question: IQuestion, answer: string | string[] | number): IComponentState {
    return {
        question: question,
        isAnswered: false
    };
}