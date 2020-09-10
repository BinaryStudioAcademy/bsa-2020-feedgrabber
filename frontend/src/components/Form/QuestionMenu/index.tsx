import React, {FC, useCallback, useEffect, useState} from "react";
import {Button, Popup, PopupProps} from "semantic-ui-react";
import SelectQuestionsFromExisting from "../../SelectQuestionsFromExisting";
import {useTranslation} from "react-i18next";
import styles from "./styles.module.css";
import {AiOutlineAppstoreAdd} from "react-icons/ai";

interface IQuestionMenuProps {
    addQuestion(): void;

    copyQuestion(): void;

    position: number;

    onDelete(): void;

    addSection(): void;
}

const styleBorder = {style: {border: 'none', backgroundColor: 'white', padding: 12}};
const popupProps = {
    basic: true, inverted: true, size: 'mini', position: 'right center'
} as PopupProps;

const QuestionMenu: FC<IQuestionMenuProps> = (
    {
        addQuestion,
        copyQuestion,
        onDelete,
        addSection,
        position
    }) => {
    const [isOpenModal, setOpenModal] = useState(false);
    const [finalTop, setFinalTop] = useState(0);
    const [top, setTop] = useState(0);
    const [t] = useTranslation();
    const contentRef = document.getElementById("app-content");

    const calcFinalTop = useCallback(() => {
      setFinalTop(Math.max(top, contentRef?.scrollTop));
    }, [contentRef, top]);

    useEffect(() => {
        const x = contentRef?.scrollTop + position;
        setTop(x ? x - 127 : 0);
        calcFinalTop();
    }, [calcFinalTop, contentRef, position]);

    useEffect(() => {
      contentRef?.addEventListener("scroll", calcFinalTop);
      return () => contentRef?.removeEventListener("scroll", calcFinalTop);
    }, [calcFinalTop, contentRef]);

    return (
        <div style={{
            position: 'absolute',
            top: finalTop,
            transition: 'all .3s cubic-bezier(0.4,0.0,0.2,1)'
        }}>
            <Button.Group basic className={styles.floatingMenu} style={{padding: '.1rem'}} vertical size="big">
                <Popup content={t("New question")} {...popupProps}
                       trigger={<Button icon="add" {...styleBorder} color="grey" onClick={addQuestion}/>}
                />
                <Popup content={t("Copy")} {...popupProps}
                       trigger={<Button icon="clone outline" {...styleBorder} onClick={copyQuestion}/>}
                />
                <Popup content={t("Add from existing questions")} {...popupProps}
                       trigger={<Button icon={AiOutlineAppstoreAdd({size: '1.6rem'})}
                                        style={{border: 'none', backgroundColor: 'white', padding: 8}}/>}
                />
                <Popup content={t("Add section")} {...popupProps}
                       trigger={<Button icon="arrows alternate vertical" {...styleBorder} onClick={addSection}/>}
                />
                <Popup content={t("Delete")} {...popupProps}
                       trigger={<Button icon="trash alternate outline" {...styleBorder} onClick={onDelete}/>}
                />
            </Button.Group>
            <SelectQuestionsFromExisting isOpen={isOpenModal} handleOpenModal={setOpenModal}/>
        </div>
    );
};

export default QuestionMenu;

