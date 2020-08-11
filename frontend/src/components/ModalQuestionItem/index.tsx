import {Card, Modal} from 'semantic-ui-react';
import styles from './styles.module.sass';
import React, {FC, useEffect, useState} from "react";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {IAppState} from "../../models/IAppState";
import {loadQuestionsRoutine} from "../../containers/QuestionsList/routines";
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

export const SelectQuestionsFromExisting: FC<ContainerProps> = ({questions, loadQuestions}) => {
    const [selected, setSelected] = useState([] as IQuestion[]);

    const handleClick = id => {
        setSelected([
            ...selected, questions.find(q => q.id === id)
        ]);
    };

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);

    return (
        <Modal>
            <Modal.Content scrolling>
                <Modal.Description>
                    {questions.map(q => <ModalQuestionItem
                            handleClick={handleClick}
                            question={q}
                            isSelected={selected.includes(q)}/>
                    )}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            </Modal.Actions>
        </Modal>);
};

const mapState = (state: IAppState) => ({
    isLoading: state.user.isLoading,
    questions: state.questions.list
});

const mapDispatch = {
    loadQuestions: loadQuestionsRoutine
};

const connector = connect(mapState, mapDispatch);

type ContainerProps = ConnectedProps<typeof connector>;

export default connector(SelectQuestionsFromExisting);
