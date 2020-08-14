import React, { useEffect, useState, FC } from "react";
import { Button, Form, Segment, Modal } from "semantic-ui-react";
import { IAppState } from "../../models/IAppState";
import { ConnectedProps, connect } from "react-redux";
import SelectQuestionsFromExisting from "../SelectQuestionsFromExisting";
import { deleteQuestionnaireRoutine } from "sagas/qustionnaires/routines";
import { addNewQuestionRoutine } from "sagas/questions/routines";

const QuestionMenu: FC<ContainerProps> = ({ deleteQuestionnaire, addNewQuestion }) => {

    const onAdd = () => {
        addNewQuestion();
    };

    const onDelete = () => {
        deleteQuestionnaire();
    };

    return (
        <Form>
            <Button.Group vertical labeled icon>
                <Button icon="plus circle" content="New question" onClick={() => onAdd()} />
                <SelectQuestionsFromExisting />
                <Button icon="rem" content="Delete" onClick={() => onDelete()} />
            </Button.Group>
        </Form>
    );
};

const mapState = (state: IAppState) => ({
    currentQuestionnaire: state.questionnaires.current.get
});

const mapDispatch = {
    deleteQuestionnaire: deleteQuestionnaireRoutine,
    addNewQuestion: addNewQuestionRoutine
};

const connector = connect(mapState, mapDispatch);

type ContainerProps = ConnectedProps<typeof connector>;

export default connector(QuestionMenu);
