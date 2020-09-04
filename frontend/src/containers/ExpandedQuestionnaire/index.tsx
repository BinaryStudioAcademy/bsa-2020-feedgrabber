import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import styles from './styles.module.sass';
import QuestionnairePreview from 'components/QuestionnairePreview';
import {IAppState} from 'models/IAppState';
import QuestionMenu from "../../components/QuestionMenu";

import {
    addQuestionToSectionRoutine,
    createSectionRoutine,
    deleteQuestionFromSectionRoutine,
    updateSectionRoutine
} from 'sagas/sections/routines';
import {indexQuestionsRoutine, loadQuestionByIdRoutine} from "sagas/questions/routines";

import UIContent from "../../components/UI/UIContent";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";
import LoaderWrapper from "../../components/LoaderWrapper";
import {toastr} from "react-redux-toastr";
import {loadOneQuestionnaireRoutine} from "../../sagas/qustionnaires/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import {toggleMenuRoutine} from "../../sagas/app/routines";

const ExpandedQuestionnaire: React.FC<ExpandedQuestionnaireProps & { match }> = (
    {
        match,
        isLoading,
        questionnaire,
        sections,
        loadQuestionnaire,
        addQuestion,
        deleteQuestion,
        currentQuestion,
        createSection,
        currentSection,
        addQuestionToSection,
        updateSection,
        indexQuestions,
        deleteQuestionFromSection
    }
) => {
    useEffect(() => {
        loadQuestionnaire(match.params.id);
    }, [match.params.id, loadQuestionnaire]);

    const handleDeleteQuestion = () => deleteQuestion({
        questionId: currentQuestion.id,
        questionnaireId: questionnaire.id
    });

    const addNewQuestion = () => {
        const section = currentSection ?? sections[sections.length - 1];
        addQuestion({
            ...defaultQuestion,
            questionnaireId: match.params.id,
            sectionId: section.id,
            index: section.questions.length
        });
    };

    const handleAddSection = () => createSection({questionnaireId: match.params.id, index: sections.length});

    const copyQuestion = () => {
        if (!currentQuestion.id) {
            toastr.info("Choose question");
            return;
        }
        const section = currentSection ?? sections[sections.length - 1];
        addQuestion({
            ...currentQuestion,
            name: `${currentQuestion.name} (copy)`,
            sectionId: section.id,
            index: section.questions.length
        });
    };

    return (
        <>
            <UIPageTitle title=""/>
            {questionnaire && (
                <div className={styles.formDetails}>
                    <LoaderWrapper loading={isLoading}>
                        <UIContent>
                            <div className={styles.questions_container}>
                                <QuestionnairePreview
                                    addQuestionToSection={addQuestionToSection}
                                    updateSection={updateSection}
                                    deleteQuestionFromSection={deleteQuestionFromSection}
                                    indexQuestions={indexQuestions}
                                    sections={sections}
                                />
                            </div>
                            <QuestionMenu
                                addQuestion={addNewQuestion}
                                copyQuestion={copyQuestion}
                                currentQuestion={currentQuestion ?? defaultQuestion}
                                onDelete={handleDeleteQuestion}
                                addSection={handleAddSection}
                            />
                        </UIContent>
                    </LoaderWrapper>
                </div>)}
        </>
    );
};

const mapStateToProps = (state: IAppState) => ({
    currentQuestion: state.formEditor.currentQuestion,
    questionnaire: state.formEditor.questionnaire,
    isLoading: state.formEditor.isLoading,
    sections: state.formEditor.sections.list,
    currentSection: state.formEditor.sections.current
});

const mapDispatchToProps = {
    loadQuestionnaire: loadOneQuestionnaireRoutine,
    updateSection: updateSectionRoutine,
    addQuestionToSection: addQuestionToSectionRoutine,
    deleteQuestionFromSection: deleteQuestionFromSectionRoutine,
    addQuestion: addQuestionToSectionRoutine,
    toggleMenu: toggleMenuRoutine,
    deleteQuestion: deleteQuestionFromSectionRoutine,
    createSection: createSectionRoutine,
    indexQuestions: indexQuestionsRoutine,
    loadQuestion: loadQuestionByIdRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ExpandedQuestionnaireProps = ConnectedProps<typeof connector>;

export default connector(ExpandedQuestionnaire);
