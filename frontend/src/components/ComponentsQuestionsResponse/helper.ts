import { IQuestion } from "models/IQuesion";
import { IComponentState } from "./IComponentProps";

export function getValidAnswer<T> (question: IQuestion, answer: string | string[]): IComponentState {
    question["answer"] = answer;
    return {
        question: question,
        isAnswered: true
    };
}

export function getInvalidAnswer (question: IQuestion, answer: string | string[]): IComponentState {
    return {
        question: question,
        isAnswered: false
    };
}