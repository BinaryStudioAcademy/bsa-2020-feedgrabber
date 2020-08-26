import React, {FC, useEffect, useState} from "react";
import {Button, Form, Popup} from "semantic-ui-react";
import SelectQuestionsFromExisting from "../SelectQuestionsFromExisting";
import styles from "./styles.module.sass";
import { number } from "prop-types";
import { createSectionRoutine } from "sagas/sections/routines";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import { connect } from "react-redux";
import { IAppState } from "models/IAppState";

interface IQuestionMenuProps {
    addQuestion(): void;
    copyQuestion(): void;
    onDelete(): void;
    createSection(action: any): void;
    currentQuestionnaireId: string;
    currentQuestion: IQuestion;
}
const QuestionMenu: FC<IQuestionMenuProps> = ({
    addQuestion,
    copyQuestion,
    currentQuestion,
    currentQuestionnaireId,
    createSection,
    onDelete
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
            addQuestion();
        } else {
            copyQuestion();
        }
    };

    const button = <Button icon={'external'} />;

    const handleAddSection = () => {
        createSection({questionnaireId: currentQuestionnaireId});
    };

    const { scrollTop, innerHeight } = positions;
    return (
        <div style={{
            position: 'absolute',
            top: (currentQuestion.top > innerHeight
                || currentQuestion.top < 0
                ? scrollTop + innerHeight / 2 - 40
                : scrollTop + currentQuestion.top),
            left: '20%',
            transition: 'all .3s cubic-bezier(0.4,0.0,0.2,1)'
        }}>
            <Form className={styles.question_menu_container}>
                <Button.Group vertical>
                    <Popup content='New question'
                        trigger={<Button icon="plus circle" onClick={() => handleAdd("new")} />}
                        position='right center' />
                    <Popup content='Add from existing questions'
                         trigger={<SelectQuestionsFromExisting button={button} />}
                         position='right center' />
                    <Popup content='Copy'
                        trigger={<Button icon="copy" onClick={() => handleAdd(currentQuestion.id)} />}
                        position='right center' />
                    <Popup content='Delete'
                        trigger={<Button icon="remove" onClick={onDelete} />}
                        position='right center' />
                    <Popup content='Add section'
                        trigger={<Button icon="plus square outline" onClick={() => handleAddSection()}/>}
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
    createSection: createSectionRoutine
};

export default connect(mapState, mapDispatch)(QuestionMenu);
