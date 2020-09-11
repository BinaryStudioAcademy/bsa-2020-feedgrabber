import {Button, Input, Modal} from 'semantic-ui-react';
import styles from './styles.module.sass';
import React, {FC, useEffect, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {ModalQuestionItem} from "./ModalQuestionItem";
import {IAppState} from "../../models/IAppState";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {useTranslation} from "react-i18next";
import GenericPagination from "../helpers/GenericPagination";
import {addExistingQToFormRoutine} from "../../sagas/sections/routines";
import {loadQuestionsExceptRoutine, setQuestionPaginationRoutine} from "../../sagas/questions/routines";

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
        isOpen,
        handleOpenModal,
        currentSectionId
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
        if (selected) addQuestions({questions: selected, sectionId: currentSectionId});
        setSelected([]);
        handleOpenModal(false);
    };

    const handleChange = (e, {value}) => {
        setQuery(value);
    };

    useEffect(() => {
        isOpen && qnId && loadQuestions({questionnaireId: qnId, query});
    }, [loadQuestions, qnId, isOpen, query]);

    return (
        <Modal
            open={isOpen}
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
                           onChange={e => setQuery(e.target.value)}
                    />
                    <GenericPagination
                        isLoading={isLoading}
                        unmutedLoading={false}
                        pagination={pagination}
                        setPagination={setPagination}
                        loadItems={() => qnId && loadQuestions({questionnaireId: qnId})}
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
    currentSectionId: state.formEditor.sections.currentId,
    pagination: state.questions.pagination
});

const mapDispatch = {
    loadQuestions: loadQuestionsExceptRoutine,
    addQuestions: addExistingQToFormRoutine,
    setPagination: setQuestionPaginationRoutine
};

const connector = connect(mapState, mapDispatch);

type ContainerProps = ConnectedProps<typeof connector>;

export default connector(SelectQuestionsFromExisting);
