import { IQuestion } from "./forms/Questions/IQuesion";

export interface IQuestionResponse<T extends IQuestion> {
    question: T;
    answerHandler?: (data: T['answer']) => void;
}
