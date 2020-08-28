import React, {FC, useEffect, useState} from "react";
import {Button, Form, Popup} from "semantic-ui-react";
import SelectQuestionsFromExisting from "../SelectQuestionsFromExisting";
import styles from "./styles.module.sass";
import {IQuestion} from "../../models/forms/Questions/IQuesion";

interface IQuestionMenuProps {
    addQuestion(): void;

    copyQuestion(): void;

    onDelete(): void;

    currentQuestion: IQuestion;
}

const QuestionMenu: FC<IQuestionMenuProps> = ({
                                                  addQuestion,
                                                  copyQuestion,
                                                  currentQuestion,
                                                  onDelete
                                              }) => {
    const [positions, setPositions] = useState({scrollTop: 0, innerHeight: window.innerHeight});
    const [isOpenModal, setOpenModal] = useState(false);

    useEffect(() => {
        (document.getElementById('root')?.firstChild?.firstChild as HTMLElement).onscroll = () => {
            setPositions(
                {
                    scrollTop: (document.getElementById('root')?.firstChild?.firstChild as HTMLElement)?.scrollTop || 0,
                    innerHeight: window.innerHeight
                }
            );
        };
    });

    const handleAdd = (id: string) => {
        if (!id) addQuestion();
        else copyQuestion();
    };

    const handleOpenModal = () => {
        setOpenModal(!isOpenModal);
    };

    const {scrollTop, innerHeight} = positions;
    return (
        <div style={{
            position: 'absolute',
            top: (currentQuestion.top > innerHeight
            || currentQuestion.top < 0
                ? (scrollTop || 0) + innerHeight / 2 - 40
                : (scrollTop || 0) + (currentQuestion.top || innerHeight / 2 - 40)),
            left: '24%',
            transition: 'all .3s cubic-bezier(0.4,0.0,0.2,1)'
        }}>
            <Form className={styles.question_menu_container}>
                <Button.Group vertical>
                    <Popup content='New question'
                           trigger={<Button icon="plus circle" onClick={() => handleAdd("")}/>}
                           position='right center'/>
                    <Popup content='Add from existing questions'
                           trigger={<Button icon="external" onClick={handleOpenModal}/>}
                           position='right center'/>
                    <Popup content='Copy'
                           trigger={<Button icon="copy" onClick={() => handleAdd(currentQuestion.id)}/>}
                           position='right center'/>
                    <Popup content='Delete'
                           trigger={<Button icon="remove" onClick={onDelete}/>}
                           position='right center'/>
                </Button.Group>
                <SelectQuestionsFromExisting isOpen={isOpenModal} handleOpenModal={setOpenModal}/>
            </Form>
        </div>
    );
};

export default QuestionMenu;
