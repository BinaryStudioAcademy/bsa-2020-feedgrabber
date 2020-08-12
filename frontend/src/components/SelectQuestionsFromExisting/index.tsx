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
    const [open, setOpen] = useState(false);

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
        selected && addQuestions(selected);
        setOpen(false);
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
            open={open}
            onMount={() => loadQuestions()}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            trigger={<Button content="Add From Existing"/>}
        >
            <Modal.Content scrolling>
                <Modal.Description>
                    {display.map(q => <ModalQuestionItem
                        key={q.id}
                        handleClick={handleClick}
                        question={q}
                        isSelected={selected.includes(q)}/>
                    )}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)} content="Cancel"/>
                <Button
                    content="Add"
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
