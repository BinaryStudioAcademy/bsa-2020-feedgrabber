import {IQuestion} from "../models/forms/Questions/IQuesion";

export function replaceAtIndex<T>(arr: T[], val: T, index: number) {
    return [...arr.slice(0, index), val, ...arr.slice(index + 1)];
}

export function deleteAtIndex(arr: Array<IQuestion>, index: number): Array<IQuestion> {
    arr.splice(index, 1);
    return arr;
}

export function insertAtIndex(arr: Array<IQuestion>, index: number, q: IQuestion): Array<IQuestion> {
    arr.splice(index, 0, q);
    return arr;
}
