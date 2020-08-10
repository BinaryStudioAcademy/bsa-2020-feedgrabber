import { getAllQuestionnaireRoutine } from "components/QuestionnaireList/routines";
import { loadQuestionsRoutine, saveQuestionRoutine } from "components/QuestionsList/routines";
import { IAppState } from "models/IAppState";
import { IQuestion } from "models/IQuesion";
import { IQuestionnaire } from "models/IQuestionnaire";

const initialState: IAppState['forms'] = {
    questions: [] as IQuestion[],
    questionnaires: [] as IQuestionnaire[],
    currentQuestionnaire: {
        questionnaire: {} as IQuestionnaire,
        questions: {} as IQuestion[]
    },
    currentQuestion: {} as IQuestion,
    isLoading: false,
    error: ''
};

const formsReducer = (state: IAppState['forms'] = initialState, { type, payload }) => {
    if (type === getAllQuestionnaireRoutine.SUCCESS) {
        return {
            ...state,
            questionnaires: payload,
            isLoading: false,
            error: {}
        };
    }
    if (type === loadQuestionsRoutine.SUCCESS) {
        return {
            ...state,
            questions: payload,
            isLoading: false,
            error: {}
        };
    }

    if (type === getAllQuestionnaireRoutine.TRIGGER
        || type === loadQuestionsRoutine.TRIGGER) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (type === getAllQuestionnaireRoutine.FAILURE) {
        return {
            ...state,
            questionnaires: [],
            isLoading: false,
            error: { payload }
        };
    }
    if (type === loadQuestionsRoutine.FAILURE) {
        return {
            ...state,
            questions: [],
            isLoading: false,
            error: { payload }
        };
    }
    return state;
};
export default formsReducer;
