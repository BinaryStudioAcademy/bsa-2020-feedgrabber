import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from "react-redux";
import LoaderWrapper from "../../components/LoaderWrapper";
import styles from './styles.module.sass';
import {IQuestion, QuestionType} from "../../models/forms/Questions/IQuesion";
import QuestionnairePreview from 'components/QuestionnairePreview';
import {loadOneQuestionnaireRoutine} from 'sagas/qustionnaires/routines';
import {IAppState} from 'models/IAppState';
import QuestionMenu from "../../components/QuestionMenu";
import { createSectionRoutine, loadSectionsByQuestionnaireRoutine } from 'sagas/sections/routines';
import { ISection } from 'models/forms/Sections/types';
import {
    deleteFromQuestionnaireRoutine,
    indexQuestionsRoutine, saveQuestionRoutine
} from "sagas/questions/routines";
import UIContent from "../../components/UI/UIContent";
import {defaultQuestionValues} from "../../components/QuestionDetails/defaultValues";
import { IQuestionnaire } from 'models/forms/Questionnaires/types';

interface IExpandedQuestionnaireProps {
    match: any;
    isLoading: boolean;
    questionnaire: IQuestionnaire;
    sections: ISection[];

    loadQuestionnaire(id: string): void;
    indexQuestions(questions: any): void;
}

const newQuestion: IQuestion = {
    type: QuestionType.freeText,
    categoryTitle: defaultQuestionValues.categoryTitle,
    name: defaultQuestionValues.name,
    answer: "",
    id: "",
    isReused: false,
    details: {},
    isRequired: false
};

const ExpandedQuestionnaire: React.FC<ExpandedQuestionnaireProps & { match }> = (
    {
        match,
        isLoading,
        questionnaire,
        sections,
        loadQuestionnaire,
        questionnaireQuestions,
        saveQuestion,
        deleteQuestion,
        currentQuestion,
        createSection,
        currentSection,
        indexQuestions
    }
) => {
    useEffect(() => {
        loadQuestionnaire(match.params.id);
    }, [match.params.id, loadQuestionnaire]);

    const [question, setQuestion] = useState<IQuestion>(currentQuestion);

    useEffect(() => {
      setQuestion(currentQuestion);
    }, [currentQuestion]);

    const handleDeleteQuestion = () => {
        deleteQuestion({questionId: question.id, questionnaireId: match.params.id});
    };

    const addNewQuestion = () => {
        saveQuestion({...newQuestion,
            questionnaireId: match.params.id,
            sectionId: currentSection? currentSection.id: sections[0].id,
            questionnaireQuestions
        });
    };

    const handleAddSection = () => {
        createSection({questionnaireId: match.params.id});
    };

    const copyQuestion = () => {
      if(!question.id) {
        return;
      }
      saveQuestion({
        ...question,
        id: "",
        name: `${question.name} (copy)`,
        questionnaireId: match.params.id,
        sectionId: currentSection? currentSection.id : sections[0].id,
        questionnaireQuestions
      });
    };

    return (
        <LoaderWrapper loading={isLoading}>
            {questionnaire && (
                <div className={styles.formDetails}>
                    <UIContent>
                        <div className={styles.questions_container}>
                            <QuestionnairePreview
                                indexQuestions={indexQuestions}
                                sections={sections}
                            />
                        </div>
                        <QuestionMenu
                            addQuestion={addNewQuestion}
                            copyQuestion={copyQuestion}
                            currentQuestion={currentQuestion}
                            onDelete={handleDeleteQuestion}
                            addSection={handleAddSection}
                        />
                    </UIContent>
                </div>
            )}
            
        </LoaderWrapper>
    );
};

const mapStateToProps = (rootState: IAppState) => ({
    questionnaire: rootState.questionnaires.current.get,
    isLoading: rootState.sections.isLoading,
    sections: rootState.sections.list,
    currentQuestion: rootState.questions.current,
    questions: rootState.questionnaires.current.questions,
    questionnaireQuestions: rootState.questionnaires.current.questions,
    currentSection: rootState.sections.current
});

const mapDispatchToProps = {
    loadQuestionnaire: loadSectionsByQuestionnaireRoutine,
    saveQuestion: saveQuestionRoutine,
    deleteQuestion: deleteFromQuestionnaireRoutine,
    createSection: createSectionRoutine,
    indexQuestions: indexQuestionsRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ExpandedQuestionnaireProps = ConnectedProps<typeof connector>;

export default connector(ExpandedQuestionnaire);
