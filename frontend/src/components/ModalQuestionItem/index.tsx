import {Button, Card, Modal} from 'semantic-ui-react';
import styles from './styles.module.sass';
import React, {FC, useState} from "react";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {IAppState} from "../../models/IAppState";
import {addSelectedQuestionsRoutine, loadQuestionsRoutine} from "../../sagas/questions/routines";
import {connect, ConnectedProps} from "react-redux";

interface IItemProps {
    handleClick: (id: string) => void;
    question: IQuestion;
    isSelected: boolean;
}

export const ModalQuestionItem: FC<IItemProps> = ({question, handleClick, isSelected}) => {
    return (
        <div key={question.id} className={styles.questionContainer}>
            <Card className={styles.question}
                  link centered fluid
                  onClick={() => handleClick(question.id)}>
                <Card.Content className={styles.content}>
                    <Card.Meta>{question.categoryTitle}</Card.Meta>
                    <Card.Description>{question.name}</Card.Description>
                    <Card.Meta className={styles.right}>{question.type}</Card.Meta>
                </Card.Content>
            </Card>
        </div>);
};

const SelectQuestionsFromExisting: FC<ContainerProps> = (
    {
        questions,
        loadQuestions,
        addQuestions,
        currentQuestions,
        isLoading
    }) => {
    const [selected, setSelected] = useState([] as IQuestion[]);

    function difference(setA, setB) {
        const _diff = new Set(setA);
        for (const elem of setB) {
            _diff.delete(elem);
        }
        return _diff;
    }

    const handleClick = id => {
        setSelected([
            ...selected, questions.find(q => q.id === id)
        ]);
    };

    const onClose = () => {
        addQuestions(selected);
    };

    const diff = difference(new Set(questions), new Set(currentQuestions));
    const display = [...diff] as IQuestion[];

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
