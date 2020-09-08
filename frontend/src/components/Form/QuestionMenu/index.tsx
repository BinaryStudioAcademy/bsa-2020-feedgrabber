import React, {FC, useEffect, useRef, useState} from "react";
import {Button, Popup, PopupProps} from "semantic-ui-react";
import SelectQuestionsFromExisting from "../../SelectQuestionsFromExisting";
import {useTranslation} from "react-i18next";

interface IQuestionMenuProps {
    addQuestion(): void;

    copyQuestion(): void;

    position: number;

    onDelete(): void;

    addSection(): void;
}

const styleBorder = {style: {border: 'none', backgroundColor: 'white', padding: 12}};
const styleBorderX = {style: {border: 'none', backgroundColor: 'white'}};
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
    const ref = useRef(document.getElementById("app-content"));
    const [t] = useTranslation();

    const x = ref.current?.scrollTop + position;
    const top = x ? x - 100 : 0;

    return (
        <div style={{
            position: 'absolute',
            top,
            transition: 'all .3s cubic-bezier(0.4,0.0,0.2,1)'
        }}>
            <Button.Group basic {...styleBorderX} vertical size="big">
                <Popup content={t("New question")} {...popupProps}
                       trigger={<Button icon="plus circle" {...styleBorder} onClick={addQuestion}/>}
                />
                <Popup content={t("Add from existing questions")} {...popupProps}
                       trigger={<Button icon="external" {...styleBorder} />}
                />
                <Popup content={t("Copy")} {...popupProps}
                       trigger={<Button icon="copy" {...styleBorder} onClick={copyQuestion}/>}
                />
                <Popup content={t("Delete")} {...popupProps}
                       trigger={<Button icon="remove" {...styleBorder} onClick={onDelete}/>}
                />
                <Popup content={t("Add section")} {...popupProps}
                       trigger={<Button icon="window maximize outline" {...styleBorder} onClick={addSection}/>}
                />
            </Button.Group>
            <SelectQuestionsFromExisting isOpen={isOpenModal} handleOpenModal={setOpenModal}/>
        </div>
    );
};

export default QuestionMenu;
// const handleScroll = () => scrollTop.current = window.pageYOffset;
// useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
// }, []);

