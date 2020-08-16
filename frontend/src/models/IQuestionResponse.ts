import { IQuestion } from "./forms/Questions/IQuesion";

export interface IQuestionResponse<T extends IQuestion> {
    question: T;
    answerHandler?: (id: string, data: T['answer']) => void;
}
