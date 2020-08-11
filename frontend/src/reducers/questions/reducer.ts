import {loadQuestionsRoutine} from "components/QuestionsList/routines";
import {IAppState} from "models/IAppState";
import {IQuestion} from "models/forms/Questions/types";

const initialState: IAppState['questions'] = {
    list: [] as IQuestion[],
    current: {} as IQuestion,
    isLoading: false
};

const questionsReducer = (state: IAppState['questions'] = initialState, {type, payload}) => {
    if (type === loadQuestionsRoutine.SUCCESS) {
        return {
            ...state,
            questions: payload,
            isLoading: false
        };
    }
    if (type === loadQuestionsRoutine.TRIGGER) {
        return {
            ...state,
            isLoading: true
        };
    }
    if (type === loadQuestionsRoutine.FAILURE) {
        return {
            ...state,
            isLoading: false
        };
    }
    return state;
};
export default questionsReducer;
