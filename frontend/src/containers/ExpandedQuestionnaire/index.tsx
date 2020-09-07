import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import styles from './styles.module.sass';
import Form from 'components/Form';
import {IAppState} from 'models/IAppState';
import QuestionMenu from "../../components/QuestionMenu";
import {
    addQuestionToSectionRoutine,
    createSectionRoutine, deleteQuestionFromSectionRoutine,
    updateQuestionsOrderRoutine,
    updateSectionRoutine,
    updateSections
} from 'sagas/sections/routines';
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
        updateSection,
        updateSectionsR,
        updateOrder
    }
) => {
    useEffect(() => {
        loadQuestionnaire(match.params.id);
    }, [match.params.id, loadQuestionnaire]);

    const addNewQuestion = () => {
        const section = currentSection ?? sections[sections.length - 1];
        addQuestion({
            ...defaultQuestion,
            questionnaireId: match.params.id,
            sectionId: section.id,
            index: section.questions?.length ?? 0
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

    const handleDeleteQuestion = () => deleteQuestion({
        questionId: currentQuestion.id,
        sectionId: currentSection.id
    });

    return (
        <>
            <UIPageTitle title=""/>
            {questionnaire && (
                <div className={styles.formDetails}>
                    <LoaderWrapper loading={isLoading}>
                        <UIContent>
                            <div className={styles.questions_container}>
                                <Form
                                    updateSections={updateSectionsR}
                                    updateSection={updateSection}
                                    updateOrder={updateOrder}
                                    currentQuestion={currentQuestion}
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
    toggleMenu: toggleMenuRoutine,
    addQuestion: addQuestionToSectionRoutine,
    deleteQuestion: deleteQuestionFromSectionRoutine,
    createSection: createSectionRoutine,
    updateSectionsR: updateSections,
    updateOrder: updateQuestionsOrderRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ExpandedQuestionnaireProps = ConnectedProps<typeof connector>;

export default connector(ExpandedQuestionnaire);
