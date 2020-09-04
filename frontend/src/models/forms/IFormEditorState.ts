import {IQuestionnaire} from "./Questionnaires/types";
import {ISectionsState} from "../../reducers/section/reducer";
import {IQuestion} from "./Questions/IQuesion";

export interface IFormEditorState {
    questionnaire: IQuestionnaire;
    sections: ISectionsState;
    currentQuestion: IQuestion;
    isLoading: boolean;
}
