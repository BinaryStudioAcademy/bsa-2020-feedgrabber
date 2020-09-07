import {Button, Modal} from 'semantic-ui-react';
import styles from './styles.module.sass';
import React, {FC, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {ModalQuestionItem} from "./ModalQuestionItem";
import {IAppState} from "../../models/IAppState";
import {addSelectedQuestionsRoutine, loadQuestionsRoutine} from "../../sagas/questions/routines";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import { useTranslation } from "react-i18next";

const SelectQuestionsFromExisting: FC<ContainerProps & {
    isOpen: boolean;
    handleOpenModal: Function;
}> = (
    {
        questions,
        loadQuestions,
        addQuestions,
        currentQuestions,
        qnId,
        isLoading,
        currentSection,
        isOpen,
        handleOpenModal
    }) => {
    const [t] = useTranslation();
    const [selected, setSelected] = useState([] as IQuestion[]);

    const handleClick = (id, isSelected) => {
        if (isSelected) {
            setSelected(selected.filter(q => q.id !== id));
        } else {
            setSelected([
                ...selected, questions.find(q => q.id === id)
            ]);
        }
    };

    const handleSubmit = () => {
        const startIndex = currentQuestions.length;
        const questions = selected.map((q, i) => { return { questionId: q.id, index: startIndex + i }; });
        if (selected) {
            selected.forEach(q => q.isReused = true);
            addQuestions({questionnaireId: qnId, questions, sectionId: currentSection.id});
        }
        setSelected([]);
        handleOpenModal(false);
    };

    const display = questions.filter(q => {
        for (const i of currentQuestions) {
            if (i.id === q.id)
                return false;
        }
        return true;
    });

    return (
        <Modal
            open={isOpen}
            onMount={() => loadQuestions()}
            className={styles.questionModal}
            onOpen={() => handleOpenModal(true)}
            onClose={() => handleOpenModal(false)}
        >
            <Modal.Content scrolling className={styles.questionsExisting}>
                <Modal.Description>
                    {display.map(q => <ModalQuestionItem
                        key={q.id}
                        handleClick={handleClick}
                        question={q}
                        isSelected={selected.includes(q)}/>
                    )}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions
            className={styles.modalActions}>
                <Button onClick={() => handleOpenModal(false)} content={t("Cancel")}/>
                <Button
                    loading={isLoading}
                    content={t("Add")}
                    labelPosition='right'
                    icon='checkmark'
                    onClick={handleSubmit}
                    positive
                />
            </Modal.Actions>
        </Modal>);
};

const mapState = (state: IAppState) => ({
    currentQuestions: state.questionnaires.current.questions,
    isLoading: state.questions.isLoading,
    qnId: state.questionnaires.current.get.id,
    questions: state.questions.list,
    currentSection: state.sections.current
});

const mapDispatch = {
    loadQuestions: loadQuestionsRoutine,
    addQuestions: addSelectedQuestionsRoutine
};

const connector = connect(mapState, mapDispatch);

type ContainerProps = ConnectedProps<typeof connector>;

export default connector(SelectQuestionsFromExisting);
