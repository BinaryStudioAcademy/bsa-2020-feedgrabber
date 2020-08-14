import {loadQuestionsRoutine} from "sagas/questions/routines";
import {IAppState} from "models/IAppState";
import {IQuestion} from "../../models/forms/Questions/IQuesion";

export interface IQuestionsState {
    list?: IQuestion[];
    current?: IQuestion;
    isLoading?: boolean;
}

const initialState: IAppState['questions'] = {
    list: [] as IQuestion[],
    current: {} as IQuestion,
    isLoading: false
};

const questionsReducer = (state: IQuestionsState = initialState, {type, payload}) => {
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
