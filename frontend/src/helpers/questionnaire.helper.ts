import {IQuestionnaire} from "../models/forms/Questionnaires/types";

export default function (questionnaireId: string, questionId: string, questionnaires: IQuestionnaire[]){
    for (const questionnaire of questionnaires) {
        if(questionnaire.id !== questionnaireId){
            const questions = questionnaire.questions;
            for(const question of questions){
                if (question.id === questionId){
                    return true;
                }
            }
        }
    }
    return false;
}