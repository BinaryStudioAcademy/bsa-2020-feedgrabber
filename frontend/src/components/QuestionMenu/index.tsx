import React, { FC } from "react";
import { Button, Form, Popup } from "semantic-ui-react";
import { IAppState } from "../../models/IAppState";
import { connect, ConnectedProps } from "react-redux";
import SelectQuestionsFromExisting from "../SelectQuestionsFromExisting";
import {
    saveQuestionToQuestionnaireRoutine,
    deleteFromQuestionnaireRoutine
} from "sagas/questions/routines";

import styles from "./styles.module.sass";

const QuestionMenu: FC<ContainerProps> = ({
    deleteQuestion,
    addQuestion,
    currentQuestion
}) => {
    const handleAdd = (id: string) => {
        if (id === "new") {
            addQuestion(null);
        } else {
            addQuestion(id);
        }
    };

    const handleDelete = () => {
        deleteQuestion(currentQuestion.id);
    };

    return (
        <div style={{
            position: 'absolute',
            top: currentQuestion.top,
            transition: 'all 0.5s linear'
        }}>
            <Form className={styles.question_menu_container}>
                <Button.Group vertical>
                    <Popup content='New question'
                        trigger={<Button icon="plus circle" onClick={() => handleAdd("new")} />}
                        position='right center' />
                    <SelectQuestionsFromExisting />
                    <Popup content='Copy'
                        trigger={<Button icon="copy" onClick={() => handleAdd(currentQuestion.id)} />}
                        position='right center' />
                    <Popup content='Delete'
                        trigger={<Button icon="remove" onClick={() => handleDelete()} />}
                        position='right center' />
                </Button.Group>
            </Form>
        </div>
    );
};

const mapState = (state: IAppState) => ({
    currentQuestion: state.questions.current
});

const mapDispatch = {
    deleteQuestion: deleteFromQuestionnaireRoutine,
    addQuestion: saveQuestionToQuestionnaireRoutine
};

const connector = connect(mapState, mapDispatch);

type ContainerProps = ConnectedProps<typeof connector>;

export default connector(QuestionMenu);
