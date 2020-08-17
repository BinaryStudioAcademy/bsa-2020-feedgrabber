import React, { FC, useState } from "react";
import { Button, Form, Popup } from "semantic-ui-react";
import { IAppState } from "../../models/IAppState";
import { connect, ConnectedProps } from "react-redux";
import SelectQuestionsFromExisting from "../SelectQuestionsFromExisting";
import { deleteQuestionRoutine } from "sagas/qustionnaires/routines";
import { addSelectedQuestionsRoutine, saveQuestionToQuestionnaireRoutine } from "sagas/questions/routines";
import { IQuestion } from "../../models/forms/Questions/IQuesion";

const QuestionMenu: FC<ContainerProps> = ({ deleteQuestion, addQuestion, saveQuestion, currentQuestion }) => {
    const handleAdd = (id: string) => {
        return;
    };

    const handleDelete = () => {
        return;
    };

    return (
        <Form>
            <Button.Group vertical>
                <Popup content='New question' 
                    trigger={<Button icon="plus circle" onClick={() => handleAdd("new")} />}
                    position='right center'/>
                <SelectQuestionsFromExisting />
                <Popup content='Copy' 
                    trigger={<Button icon="copy" onClick={() => handleAdd("copy")}/>} 
                    position='right center'/>
                <Popup content='Delete' 
                    trigger={<Button icon="remove" onClick={() => handleDelete()} />} 
                    position='right center'/>
            </Button.Group>
        </Form>
    );
};

const mapState = (state: IAppState) => ({
    currentQuestion: state.questionnaires.currentQuestion
});

const mapDispatch = {
    deleteQuestion: deleteQuestionRoutine,
    addQuestion: addSelectedQuestionsRoutine,
    saveQuestion: saveQuestionToQuestionnaireRoutine
};

const connector = connect(mapState, mapDispatch);

type ContainerProps = ConnectedProps<typeof connector>;

export default connector(QuestionMenu);
