import React, {FC, useEffect, useState} from 'react';
import {connect, ConnectedProps} from "react-redux";
import styles from './styles.module.sass';
import Form from 'components/Form';
import {IAppState} from 'models/IAppState';
import QuestionMenu from "../../components/Form/QuestionMenu";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";
import LoaderWrapper from "../../components/helpers/LoaderWrapper";
import {toastr} from "react-redux-toastr";
import {loadOneQuestionnaireRoutine} from "../../sagas/qustionnaires/routines";
import {setFloatingMenuPos, toggleMenuRoutine} from "../../sagas/app/routines";
import SelectQuestionsFromExisting from "../../components/SelectQuestionsFromExisting";
import {getCurrentEntity} from "../../helpers/formEditor.helper";
import {QuestionEntity, SectionEntity} from "../../reducers/formEditor/reducer";
import {
    addQToFormRoutine,
    addSectionRoutine,
    deleteQInFormRoutine,
    deleteSectionRoutine,
    loadFormRoutine,
    setCurrentQInForm,
    updateOrderInForm,
    updateOrderInFormRoutine,
    updateSectionRoutine
} from "../../sagas/sections/routines";
import UIContent from "../../components/UI/UIContent";

const FormEditor: FC<FormEditorProps & { match }> = (
    {
        match,
        formState: {
            questions,
            sections,
            questionnaire,
            isLoading
        },
        currentQuestion,
        currentSection,
        position,
        updateOrder,
        updateOrderApi,
        setCurrentQuestion,
        addQuestion,
        toggleMenu,
        loadForm,
        deleteQuestion,
        createSection,
        updateSection,
        deleteSection
    }
) => {

    const [openExisting, setOpenExisting] = useState(false);

    useEffect(() => {
        if (questionnaire.id !== match.params.id) {
            loadForm(match.params.id);
        }
        toggleMenu(false);
        const e = document.getElementById("root");
        const prevBack = e.style.backgroundColor;
        e.style.backgroundColor = '#f0ebf8';
        return () => e.style.backgroundColor = prevBack;
    }, [match.params.id, loadForm, toggleMenu, questionnaire]);

    const addNewQuestion = () => {
        addQuestion({
            ...defaultQuestion,
            questionnaireId: match.params.id,
            sectionId: sections.currentId,
            index: currentSection.questions.length
        });
    };

    const handleAddSection = () => createSection({questionnaireId: match.params.id, index: sections.ids.length});

    const copyQuestion = () => {
        if (!questions.currentId || !sections.currentId) {
            toastr.info("Choose question");
            return;
        }
        addQuestion({
            ...currentQuestion.question,
            name: `${currentQuestion.question.name} (copy)`,
            sectionId: currentSection.id,
            index: currentSection.questions.length
        });
    };

    const handleDeleteQuestion = () => currentQuestion &&
        deleteQuestion({
            questionId: currentQuestion.id,
            sectionId: currentQuestion.section
        });

    const handleAddFromExisting = () => {
        setOpenExisting(!openExisting);
    };

    return (
        <>
            {questionnaire && (
                <LoaderWrapper loading={isLoading}>
                    <UIContent>
                    <SelectQuestionsFromExisting isOpen={openExisting} handleOpenModal={setOpenExisting}/>
                        <div className={styles.container}>
                            <div className={styles.form}>
                                <Form
                                    setCurrentQuestion={setCurrentQuestion}
                                    updateSection={updateSection}
                                    updateOrder={updateOrder}
                                    updateOrderApi={updateOrderApi}
                                    deleteSection={deleteSection}
                                    sections={sections}
                                    questions={questions}
                                />
                            </div>
                            <div className={styles.menu}>
                                <QuestionMenu
                                    position={position}
                                    addQuestion={addNewQuestion}
                                    copyQuestion={copyQuestion}
                                    onDelete={handleDeleteQuestion}
                                    addSection={handleAddSection}
                                    addFromExisting={handleAddFromExisting}
                                />
                            </div>
                        </div>
                    </UIContent>
                </LoaderWrapper>
            )}
        </>
    );
};

const mapState = (state: IAppState) => ({
    formState: state.formEditor,
    position: state.app.floatingMenuPos,
    currentQuestion: getCurrentEntity<QuestionEntity>(state.formEditor.questions),
    currentSection: getCurrentEntity<SectionEntity>(state.formEditor.sections)
});

const mapDispatch = {
    loadForm: loadFormRoutine,
    updateSection: updateSectionRoutine,
    setCurrentQuestion: setCurrentQInForm,
    toggleMenu: toggleMenuRoutine,
    addQuestion: addQToFormRoutine,
    deleteQuestion: deleteQInFormRoutine,
    createSection: addSectionRoutine,
    updateOrder: updateOrderInForm,
    updateOrderApi: updateOrderInFormRoutine,
    deleteSection: deleteSectionRoutine
};

const connector = connect(mapState, mapDispatch);

type FormEditorProps = ConnectedProps<typeof connector>;

export default connector(FormEditor);
