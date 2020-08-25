import {IQuestion} from "../models/forms/Questions/IQuesion";

export function replaceAtIndex<T>(arr: T[], val: T, index: number) {
    return [...arr.slice(0, index), val, ...arr.slice(index + 1)];
}

export function updateQuestions(questions: IQuestion[], newQuestion: IQuestion) {
    let isThereQuestion = false;
    for (const question of questions) {
        if (newQuestion.id === question.id) {
            isThereQuestion = true;
        }
    }

    if (isThereQuestion) {
        return questions.map(q => q.id === newQuestion.id ?
            newQuestion : q);
    }
    questions.push(newQuestion);
    return questions;

}