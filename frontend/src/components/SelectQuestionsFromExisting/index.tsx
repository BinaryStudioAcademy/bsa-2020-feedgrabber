import {Button, Input, Modal} from 'semantic-ui-react';
import styles from './styles.module.sass';
import React, {FC, useEffect, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {ModalQuestionItem} from "./ModalQuestionItem";
import {IAppState} from "../../models/IAppState";
import {
    addSelectedQuestionsRoutine,
    loadQuestionsRoutine,
    setQuestionPaginationRoutine
} from "../../sagas/questions/routines";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {useTranslation} from "react-i18next";
import GenericPagination from "../helpers/GenericPagination";

const SelectQuestionsFromExisting: FC<ContainerProps & {
    isOpen: boolean;
    handleOpenModal: Function;
}> = (
    {
        pagination,
        setPagination,
        loadQuestions,
        addQuestions,
        qnId,
        isLoading,
        currentSection,
        isOpen,
        handleOpenModal
    }) => {
    const [t] = useTranslation();
    const [selected, setSelected] = useState([] as IQuestion[]);
    const [query, setQuery] = useState('');
    const handleClick = (id, isSelected) => {
        if (isSelected) {
            setSelected(selected.filter(q => q.id !== id));
        } else {
            setSelected([
                ...selected, pagination.items.find(q => q.id === id)
            ]);
        }
    };

    const handleSubmit = () => {
        const startIndex = currentSection.questions.length;
        const questions = selected.map((q, i) => {
            return {questionId: q.id, index: startIndex + i};
        });
        if (selected) {
            selected.forEach(q => q.isReused = true);
            addQuestions({questionnaireId: qnId, questions, sectionId: currentSection.id});
        }
        setSelected([]);
        handleOpenModal(false);
    };

    const handleChange = (e, {value}) => {
      setQuery(value);
    };

    useEffect(()=>{loadQuestions({quest: qnId, query});},[loadQuestions, qnId, query]);

    return (
        <Modal
            open={isOpen}
            onMount={() => loadQuestions({quest: qnId})}
            className={styles.questionModal}
            onOpen={() => handleOpenModal(true)}
            onClose={() => handleOpenModal(false)}
        >
            <Modal.Content scrolling className={styles.questionsExisting}>
                <Modal.Description>
                    <Input style={{width: '450px', marginRight: '1em'}}
                           icon={{
                               name: 'search',
                               circular: true,
                               link: true,
                               onClick: handleChange,
                               style: {boxShadow: "none"}
                           }}
                           placeholder={t('Search existing questions')}
                           value={query}
                           onChange={handleChange}
                    />
                    <GenericPagination
                        isLoading={isLoading}
                        unmutedLoading={false}
                        pagination={pagination}
                        setPagination={setPagination}
                        loadItems={() => loadQuestions({quest: qnId, query})}
                        mapItemToJSX={(q: IQuestion) =>
                            <ModalQuestionItem
                                key={q.id}
                                handleClick={handleClick}
                                question={q}
                                isSelected={selected.includes(q)}/>
                        }
                    />
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
    isLoading: state.questions.isLoading,
    qnId: state.formEditor.questionnaire.id,
    pagination: state.questions.pagination,
    currentSection: state.formEditor.sections.current
});

const mapDispatch = {
    loadQuestions: loadQuestionsRoutine,
    addQuestions: addSelectedQuestionsRoutine,
    setPagination: setQuestionPaginationRoutine
};

const connector = connect(mapState, mapDispatch);

type ContainerProps = ConnectedProps<typeof connector>;

export default connector(SelectQuestionsFromExisting);
