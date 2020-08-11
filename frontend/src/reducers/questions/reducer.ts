import {loadQuestionsRoutine} from "containers/QuestionsList/routines";
import {IAppState} from "models/IAppState";
import {IQuestion} from "models/forms/Questions/types";

const initialState: IAppState['questions'] = {
    list: [] as IQuestion[],
    current: {} as IQuestion,
    isLoading: false
};

const questionsReducer = (state: IAppState['questions'] = initialState, {type, payload}) => {
    switch (type) {
        case loadQuestionsRoutine.SUCCESS:
            return {
                ...state,
                list: payload,
                isLoading: false
            };
        case loadQuestionsRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case loadQuestionsRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default questionsReducer;
