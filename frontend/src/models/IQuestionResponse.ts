import { IQuestion } from "./forms/Questions/IQuesion";

export interface IQuestionResponse {
    question: IQuestion;
    answerHandler?: (id: string, data: IQuestion['details']) => void;
}
