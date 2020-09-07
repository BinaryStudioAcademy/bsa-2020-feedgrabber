import QuestionDetailsPage from "../../containers/QuestionDeatilsPage";
import TypeToResponseMap from "models/forms/Questions/TypeToResponseMap";
import {IAppState} from "models/IAppState";
import {IQuestionResponse} from "models/IQuestionResponse";
import React, {FC, useEffect, useRef, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {loadQuestionByIdRoutine} from "sagas/questions/routines";
import {Button, Header, Label, Modal, Segment} from "semantic-ui-react";
import styles from "./styles.module.sass";
import { useTranslation } from "react-i18next";

const ResponseQuestion: FC<IQuestionResponse<any> & ResponseQuestionProps> =
    ({question, answerHandler, loadCurrent, nowModifying, isModifyingEnabled}) => {
        const {name, categoryTitle, type, id} = question;
        const [editor, setEditor] = useState(true);
        const detailsPage = useRef(null);
        const [t] = useTranslation();
        const [style, setStyle] = useState(styles.container);
        const [modal, setModal] = useState(false);

        useEffect(() => {
            id === nowModifying.id ? setStyle(styles.highlight)
                : setStyle(styles.container);
        }, [id, nowModifying]);

        const handleSegmentClick = () => {
            if ((isModifyingEnabled && !answerHandler) || editor) {
                setEditor(!editor);
                const {top, right} = detailsPage.current.getBoundingClientRect();
                loadCurrent({id: question.id, top, right});
            }
            if(!isModifyingEnabled && !answerHandler && !editor){
                setModal(true);
            }
        };

        const handleSubmit = () => {
            handleCancel();
            setEditor(!editor);
            const {top, right} = detailsPage.current.getBoundingClientRect();
            loadCurrent({id: question.id, top, right});
        };

        function handleCancel() {
            setModal(false);
        };

        return (
            <div ref={detailsPage}>
                <Modal
                    open={modal}
                    size="small"
                    onClose={handleCancel}
                    style={{textAlign: "center"}}>
                    <Modal.Content>
                        <Modal.Description as="h3">
                            <p>{t("This question was answered already")}</p>
                            {t("Are you sure you want to change it?")}
                        </Modal.Description>
                        <Modal.Actions>
                            <Button
                                content={t("Yes, I am sure")}
                                labelPosition='right'
                                icon='checkmark'
                                positive
                                onClick={handleSubmit}/>
                            <Button
                                content={t("Cancel")}
                                onClick={handleCancel}/>
                        </Modal.Actions>
                    </Modal.Content>
                </Modal>
                <Segment className={style}>
                    {editor && (id === nowModifying.id)
                        ?
                        <div className={styles.scaleTop}>
                            <QuestionDetailsPage
                                match={{params: {id: question.id}}}
                                isPreview={{question: question, close: handleSegmentClick()}}/>
                        </div>
                        :
                        <div onClick={handleSegmentClick}>
                            {!answerHandler && <Header as='h4'>{name}<Label>{categoryTitle}</Label></Header>}
                            {TypeToResponseMap.get(type.toUpperCase())?.
                            ({question, answerHandler, response: question.answer})}
                        </div>
                    }
                </Segment>
            </div>);
    };

const mapState = (state: IAppState) => ({
    nowModifying: state.questions.current,
    isModifyingEnabled: state.questionnaires.current.get.isEditingEnabled
});

const mapDispatch = {
    loadCurrent: loadQuestionByIdRoutine
};

const connector = connect(mapState, mapDispatch);

type ResponseQuestionProps = ConnectedProps<typeof connector>;

export default connector(ResponseQuestion);

