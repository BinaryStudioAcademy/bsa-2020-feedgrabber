import {IQuestionnaire} from "./Questionnaires/types";
import {IQuestion} from "./Questions/IQuesion";
import {ISectionsState} from "../../reducers/formEditor/reducer";

export interface IFormEditorState {
    questionnaire: IQuestionnaire;
    sections: ISectionsState;
    currentQuestion: IQuestion;
    isLoading: boolean;
}
