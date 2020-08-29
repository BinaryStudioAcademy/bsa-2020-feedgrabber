import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from "react-redux";
import styles from './styles.module.sass';
import QuestionnairePreview from 'components/QuestionnairePreview';
import {IAppState} from 'models/IAppState';
import QuestionMenu from "../../components/QuestionMenu";
import {createSectionRoutine, loadSectionsByQuestionnaireRoutine} from 'sagas/sections/routines';
import {
    deleteFromQuestionnaireRoutine,
    indexQuestionsRoutine,
    loadQuestionByIdRoutine,
    saveQuestionRoutine
} from "sagas/questions/routines";
import UIContent from "../../components/UI/UIContent";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";
import {Header} from "semantic-ui-react";
import LoaderWrapper from "../../components/LoaderWrapper";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {toastr} from "react-redux-toastr";

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
        indexQuestions,
        loadQuestion
    }
) => {
    useEffect(() => {
        loadQuestionnaire(match.params.id);
    }, [match.params.id, loadQuestionnaire]);

    const [question, setQuestion] = useState<IQuestion>();
    if (!question) {
        loadQuestion({ id: "" });
    }

    useEffect(() => {
        setQuestion(currentQuestion);
    }, [currentQuestion]);

    const handleDeleteQuestion = () => deleteQuestion({questionId: question.id, questionnaireId: match.params.id});

    const addNewQuestion = () =>
        saveQuestion({
            ...defaultQuestion,
            questionnaireId: match.params.id,
            questionnaireQuestions,
            sectionId: currentSection ? currentSection.id : sections[0].id
        });

    const handleAddSection = () => createSection({questionnaireId: match.params.id});

    const copyQuestion = () => {
        if (!question.id) {
            toastr.info("Choose question");
            return;
        }
        saveQuestion({
            ...question,
            id: "",
            name: `${question.name} (copy)`,
            questionnaireId: match.params.id,
            sectionId: currentSection ? currentSection.id : sections[0].id,
            questionnaireQuestions
        });
    };

    return (
        <>
            <Header as='h1' dividing style={{padding: "1.2em", textAlign: "center"}}>
                <Header.Content>
                    {questionnaire.title}
                </Header.Content>
            </Header>
            {questionnaire && (
                <div className={styles.formDetails}>
                    <LoaderWrapper loading={isLoading}>
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
                                currentQuestion={question ? question : defaultQuestion}
                                onDelete={handleDeleteQuestion}
                                addSection={handleAddSection}
                            />
                        </UIContent>
                    </LoaderWrapper>
                </div>)}
        </>
    );
};

const mapStateToProps = (rootState: IAppState) => ({
    currentQuestion: rootState.questions.current,
    questionnaire: rootState.questionnaires.current.get,
    isLoading: rootState.sections.isLoading,
    sections: rootState.sections.list,
    questionnaireQuestions: rootState.questionnaires.current.questions,
    currentSection: rootState.sections.current
});

const mapDispatchToProps = {
    loadQuestionnaire: loadSectionsByQuestionnaireRoutine,
    saveQuestion: saveQuestionRoutine,
    deleteQuestion: deleteFromQuestionnaireRoutine,
    createSection: createSectionRoutine,
    indexQuestions: indexQuestionsRoutine,
    loadQuestion: loadQuestionByIdRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ExpandedQuestionnaireProps = ConnectedProps<typeof connector>;

export default connector(ExpandedQuestionnaire);
