import { IAnswer } from "models/forms/responseAnswers/types";
import { saveAnswersRoutine } from "sagas/responseAnswers/routines";

interface IResponseAnswersState<T> {
    answers: IAnswer<T>[];
}

const answerReducer = (state: IResponseAnswersState<{}> = {answers: []}, {type, payload}) => {
    switch(type) {
        case saveAnswersRoutine.TRIGGER:
            return {
                ...state,
                answers: payload
            };
        default:
            return state;
    }
};

export default answerReducer;