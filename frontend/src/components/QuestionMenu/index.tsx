import React, { FC, useState } from "react";
import { Button, Form, Popup } from "semantic-ui-react";
import { IAppState } from "../../models/IAppState";
import { connect, ConnectedProps } from "react-redux";
import SelectQuestionsFromExisting from "../SelectQuestionsFromExisting";
import {
    saveQuestionToQuestionnaireRoutine,
    deleteFromQuestionnaireRoutine
} from "sagas/questions/routines";

const QuestionMenu: FC<ContainerProps> = ({
                                              deleteQuestion,
                                              addQuestion,
                                              currentQuestion
}) => {
    const handleAdd = (id: string) => {
        if(id === "new") {
            addQuestion('empty');
        }else {
            addQuestion(currentQuestion.id);
        }
    };

    const handleDelete = () => {
        deleteQuestion(currentQuestion.id);
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
    deleteQuestion: deleteFromQuestionnaireRoutine,
    addQuestion: saveQuestionToQuestionnaireRoutine
};

const connector = connect(mapState, mapDispatch);

type ContainerProps = ConnectedProps<typeof connector>;

export default connector(QuestionMenu);
