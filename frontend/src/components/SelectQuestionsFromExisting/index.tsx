import {Button, Modal} from 'semantic-ui-react';
import React, {FC, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {ModalQuestionItem} from "./ModalQuestionItem";
import {IAppState} from "../../models/IAppState";
import {addSelectedQuestionsRoutine, loadQuestionsRoutine} from "../../sagas/questions/routines";
import {IQuestion} from "../../models/forms/Questions/IQuesion";

const SelectQuestionsFromExisting: FC<ContainerProps> = (
    {
        questions,
        loadQuestions,
        addQuestions,
        currentQuestions,
        isLoading
    }) => {
    const [selected, setSelected] = useState([] as IQuestion[]);

    const handleClick = id => {
        setSelected([
            ...selected, questions.find(q => q.id === id)
        ]);
    };

    const onClose = () => {
        addQuestions(selected);
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
            onMount={() => loadQuestions()}
            onClose={onClose}
            trigger={<Button content="Add From Existing"/>}
        >
            <Modal.Content scrolling>
                <Modal.Description>
                    {display.map(q => <ModalQuestionItem
                        handleClick={handleClick}
                        question={q}
                        isSelected={selected.includes(q)}/>
                    )}
                </Modal.Description>
            </Modal.Content>
        </Modal>);
};

const mapState = (state: IAppState) => ({
    currentQuestions: state.questionnaires.current.questions,
    isLoading: state.user.isLoading,
    questions: state.questions.list
});

const mapDispatch = {
    loadQuestions: loadQuestionsRoutine,
    addQuestions: addSelectedQuestionsRoutine
};

const connector = connect(mapState, mapDispatch);

type ContainerProps = ConnectedProps<typeof connector>;

export default connector(SelectQuestionsFromExisting);
