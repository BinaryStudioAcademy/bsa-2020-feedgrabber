import QuestionDetailsPage from "../../containers/QuestionDeatilsPage";
import TypeToResponseMap from "models/forms/Questions/TypeToResponseMap";
import {IAppState} from "models/IAppState";
import {IQuestionResponse} from "models/IQuestionResponse";
import React, {FC, useRef, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {loadQuestionByIdRoutine} from "sagas/questions/routines";
import {Header, Icon, Label, Segment} from "semantic-ui-react";
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
                    {!answerHandler && isModifyingEnabled &&
                        <Icon name='code' className={styles.edit} onClick={handleSegmentClick}/>
                    }
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
                            {TypeToResponseMap.get(type.toUpperCase())?.({question, answerHandler})}
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

