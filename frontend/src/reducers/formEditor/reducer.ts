import {ISectionsState} from "../section/reducer";
import {IQuestionnaire} from "../../models/forms/Questionnaires/types";
import {IAppState} from "../../models/IAppState";
import {IQuestion} from "../../models/forms/Questions/IQuesion";

const init = {
    questionnaire: {} as IQuestionnaire,
    sections: {} as ISectionsState,
    currentQuestion: {} as IQuestion,
    isLoading: false
};

const formEditorReducer = (state: IAppState["formEditor"] = init, {type, payload}) => {
    switch (type) {
        default:
            return state;
    }
};

export default formEditorReducer;
