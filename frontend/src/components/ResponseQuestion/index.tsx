import QuestionDetailsPage from "../../containers/QuestionDeatilsPage";
import TypeToResponseMap from "models/forms/Questions/TypeToResponseMap";
import {IAppState} from "models/IAppState";
import {IQuestionResponse} from "models/IQuestionResponse";
import React, {FC, useEffect, useRef, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {loadQuestionByIdRoutine} from "sagas/questions/routines";
import {Button, Header, Icon, Label, Popup, Segment} from "semantic-ui-react";
import styles from "./styles.module.sass";

const ResponseQuestion: FC<IQuestionResponse<any> & ResponseQuestionProps> =
    ({question, answerHandler, loadCurrent, nowModifying, isModifyingEnabled}) => {
        const {name, categoryTitle, type, id} = question;
        const [editor, setEditor] = useState(false);
        const detailsPage = useRef(null);
        const [style, setStyle] = useState(styles.container);

        useEffect(() => {
            id === nowModifying.id ? setStyle(styles.highlight) : setStyle(styles.container);
        }, [id, nowModifying]);

        const handleSegmentClick = () => {
            setEditor(!editor);
            const {top, right} = detailsPage.current.getBoundingClientRect();
            loadCurrent({id: question.id, top, right});
        };

        return (
            <div ref={detailsPage}>
                <Segment
                    className={style}>
                    {((isModifyingEnabled && !answerHandler) || editor) &&
                    <Icon name='code' link onClick={handleSegmentClick}/>}
                    {!isModifyingEnabled && !editor &&
                    <Popup
                        trigger={!answerHandler && <Icon name='code' link/>}
                        on='click'>
                        <Popup
                            trigger={<Button color='blue'
                                             content='I know what I do!'
                                             fluid
                                             onClick={handleSegmentClick}/>}
                            content='It may affect answers that have been given before!!!'
                            position='top center'
                            size='tiny'
                            inverted
                        />
                    </Popup>}
                    {editor && (id === nowModifying.id)
                        ?
                        <div className={styles.scaleTop}>
                            <QuestionDetailsPage
                                match={{params: {id: question.id}}}
                                isPreview={{question: question, close: handleSegmentClick}}/>
                        </div>
                        :
                        <>
                            {!answerHandler && <Header as='h4'>{name}<Label>{categoryTitle}</Label></Header>}
                            {TypeToResponseMap.get(type.toUpperCase())?.
                            ({question, answerHandler, response: question.answer})}
                        </>
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

