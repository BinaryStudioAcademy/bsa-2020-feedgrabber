import React, {FC, useEffect, useState} from "react";
import {Button, Form, Popup} from "semantic-ui-react";
import SelectQuestionsFromExisting from "../SelectQuestionsFromExisting";
import styles from "./styles.module.sass";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {useTranslation} from "react-i18next";

interface IQuestionMenuProps {
    addQuestion(): void;

    copyQuestion(): void;

    onDelete(): void;
    addSection(): void;

    currentQuestion: IQuestion;
}

const QuestionMenu: FC<IQuestionMenuProps> = ({
                                                  addQuestion,
                                                  copyQuestion,
                                                  currentQuestion,
                                                  onDelete,
                                                  addSection
                                              }) => {
    const [positions, setPositions] = useState({scrollTop: 0, innerHeight: window.innerHeight});
    const [isOpenModal, setOpenModal] = useState(false);
    const [t] = useTranslation();

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

    const handleOpenModal = () => {
        setOpenModal(!isOpenModal);
    };

    const { scrollTop, innerHeight } = positions;
    return (
        <div style={{
            position: 'absolute',
            top: (currentQuestion.top > innerHeight
            || currentQuestion.top < 0
                ? (scrollTop || 0) + innerHeight / 2 - 40
                : (scrollTop || 0) + (currentQuestion.top || innerHeight / 2 - 40)),
            left: '20%',
            transition: 'all .3s cubic-bezier(0.4,0.0,0.2,1)'
        }}>
            <Form className={styles.container}>
                <Button.Group className={styles.buttons} vertical>
                    <Popup content={t("New question")}
                           trigger={<Button icon="plus circle" onClick={addQuestion}/>}
                           position='right center'/>
                    <Popup content={t("Add from existing questions")}
                           trigger={<Button icon="external" onClick={handleOpenModal}/>}
                           position='right center'/>
                    <Popup content={t("Copy")}
                           trigger={<Button icon="copy" onClick={copyQuestion}/>}
                           position='right center'/>
                    <Popup content={t("Delete")}
                        trigger={<Button icon="remove" onClick={onDelete} />}
                        position='right center' />
                    <Popup content={t("Add section")}
                        trigger={<Button icon="plus square outline" onClick={() => addSection()}/>}
                        position='right center' />
                </Button.Group>
                <SelectQuestionsFromExisting isOpen={isOpenModal} handleOpenModal={setOpenModal}/>
            </Form>
        </div>
    );
};

export default QuestionMenu;
