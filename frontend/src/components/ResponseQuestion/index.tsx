import QuestionDetailsPage from "../../containers/QuestionDeatilsPage";
import TypeToResponseMap from "models/forms/Questions/TypeToResponseMap";
import {IAppState} from "models/IAppState";
import {IQuestionResponse} from "models/IQuestionResponse";
import React, {FC, useRef, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {loadQuestionByIdRoutine} from "sagas/questions/routines";
import {Button, Grid, Header, Icon, Label, Popup, Segment} from "semantic-ui-react";
import styles from "./styles.module.sass";

const ResponseQuestion: FC<IQuestionResponse<any> & ResponseQuestionProps> =
    ({question, answerHandler, loadCurrent, nowModifying, isModifyingEnabled}) => {
        const {name, categoryTitle, type, id} = question;
        const [editor, setEditor] = useState(false);
        const detailsPage = useRef(null);

        const handleSegmentClick = () => {
            setEditor(!editor);
            const {top, right} = detailsPage.current.getBoundingClientRect();
            loadCurrent({id: question.id, top, right});
        };

        return (
            <div ref={detailsPage}>
                <Segment
                    className={styles.container}>
                    {isModifyingEnabled && !answerHandler &&
                    <Icon name='code' link onClick={isModifyingEnabled && handleSegmentClick}/>}
                    {!isModifyingEnabled &&
                    <Popup
                        trigger={!answerHandler && <Icon name='code' link/>}
                        on='click'>
                        <Grid divided columns='equal'>
                            <Grid.Column>
                                <Popup
                                    trigger={<Button color='blue' content='Blue Pill' fluid/>}
                                    content='I know what I do!'
                                    position='top center'
                                    size='tiny'
                                    inverted
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Popup
                                    trigger={<Button color='red' content='Red Pill' fluid/>}
                                    content='Stay in Wonderland, and I show you how deep the rabbit hole goes.'
                                    position='top center'
                                    size='tiny'
                                    inverted
                                />
                            </Grid.Column>
                        </Grid>
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

