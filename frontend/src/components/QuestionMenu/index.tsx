import React, { FC, useEffect, useState } from "react";
import { Button, Form, Popup } from "semantic-ui-react";
import { IAppState } from "../../models/IAppState";
import { connect, ConnectedProps } from "react-redux";
import SelectQuestionsFromExisting from "../SelectQuestionsFromExisting";
import {
    addNewQuestionToQuestionnaireRoutine,
    deleteFromQuestionnaireRoutine, copyQuestionInQuestionnaireRoutine
} from "sagas/questions/routines";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";

import styles from "./styles.module.sass";
import { number } from "prop-types";

const QuestionMenu: FC<ContainerProps> = ({
    deleteQuestion,
    addQuestion,
    copyQuestion,
    currentQuestion,
    currentQuestionnaireId
}) => {
    const [positions, setPositions] = useState({ scrollTop: 0, innerHeight: window.innerHeight });
    useEffect(() => {
        (document.getElementById('root')?.firstChild?.firstChild as HTMLElement).onscroll = (e: Event) => {
            setPositions(
                {
                    scrollTop: (document.getElementById('root')?.firstChild?.firstChild as HTMLElement)?.scrollTop || 0,
                    innerHeight: window.innerHeight
                }
            );
        };
    });
    const handleAdd = (id: string) => {
        if (id === "new") {
            addQuestion({ qId: currentQuestionnaireId });
        } else {
            copyQuestion({ qId: currentQuestionnaireId, question: currentQuestion });
        }
    };

    const handleDelete = () => {
        deleteQuestion({ qId: currentQuestionnaireId, id: currentQuestion.id });
    };

    const { scrollTop, innerHeight } = positions;
    return (
        <div style={{
            position: 'absolute',
            top: (currentQuestion.top > innerHeight
                || currentQuestion.top < 0
                ? scrollTop + innerHeight / 2 - 40
                : scrollTop + currentQuestion.top),
            transition: 'all .3s cubic-bezier(0.4,0.0,0.2,1)'
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
    currentQuestion: state.questions.current,
    currentQuestionnaireId: state.questionnaires.current.get.id
});

const mapDispatch = {
    deleteQuestion: deleteFromQuestionnaireRoutine,
    addQuestion: addNewQuestionToQuestionnaireRoutine,
    copyQuestion: copyQuestionInQuestionnaireRoutine
};

const connector = connect(mapState, mapDispatch);

type ContainerProps = ConnectedProps<typeof connector>;

export default connector(QuestionMenu);
