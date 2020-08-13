import { IQuestion } from "./forms/Questions/IQuesion";

export interface IQuestionResponse {
    question: IQuestion;
    modifyHandler?: (id: string) => void;
    answerHandler?: (id: string, data: IQuestion['details']) => void;
}
