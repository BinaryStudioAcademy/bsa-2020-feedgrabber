import { IQuestion } from "./forms/Questions/IQuesion";
import {IAnswerBody} from "./forms/Response/types";

export interface IQuestionResponse<T extends IQuestion> {
    question: T;
    answerHandler?: (data: T['answer']) => void;
    response?: IAnswerBody;
}
