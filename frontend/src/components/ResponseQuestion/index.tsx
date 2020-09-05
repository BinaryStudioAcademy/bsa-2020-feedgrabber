import QuestionDetailsPage from "../../containers/QuestionDeatilsPage";
import TypeToResponseMap from "models/forms/Questions/TypeToResponseMap";
import {IAppState} from "models/IAppState";
import {IQuestionResponse} from "models/IQuestionResponse";
import React, {FC, useEffect, useRef, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {Button, Header, Label, Modal, Segment} from "semantic-ui-react";
import styles from "./styles.module.sass";
import {useTranslation} from "react-i18next";
import {setFloatingMenuPos} from "../../sagas/app/routines";
import {setCurrentQuestionInSection} from "../../sagas/sections/routines";

const ResponseQuestion: FC<IQuestionResponse<any> & ResponseQuestionProps & { isCurrent: boolean }> =
    ({question, answerHandler, setMenuPos, setCurrentQ, isCurrent, isModifyingEnabled}) => {
        const {name, categoryTitle, type} = question;
        const detailsPage = useRef(null);
        const [t] = useTranslation();
        const [style, setStyle] = useState(styles.container);
        const [modal, setModal] = useState(false);

        useEffect(() => {
            isCurrent ? setStyle(styles.highlight) : setStyle(styles.container);
        }, [isCurrent]);

        const handleSegmentClick = () => {
            if (isModifyingEnabled && !answerHandler) {
                setCurrentQ(question);
                setMenuPos(detailsPage.current.getBoundingClientRect().top);
            }
            if (!isModifyingEnabled && !answerHandler) {
                setModal(true);
            }
        };

        const handleSubmit = () => {
            setModal(false);
            setCurrentQ(question);
            setMenuPos(detailsPage.current.getBoundingClientRect().top);
        };

        function handleCancel() {
            setModal(false);
        }

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
                                content="Yes, I am sure"
                                labelPosition='right'
                                icon='checkmark'
                                positive
                                onClick={handleSubmit}/>
                            <Button
                                content="Cancel"
                                onClick={handleCancel}/>
                        </Modal.Actions>
                    </Modal.Content>
                </Modal>
                <Segment className={style}>
                    {isCurrent
                        ?
                        <div className={styles.scaleTop}>
                            <QuestionDetailsPage />
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
    isModifyingEnabled: state.formEditor.questionnaire.isEditingEnabled
});

const connector = connect(mapState, {setMenuPos: setFloatingMenuPos, setCurrentQ: setCurrentQuestionInSection});

type ResponseQuestionProps = ConnectedProps<typeof connector>;

export default connector(ResponseQuestion);

