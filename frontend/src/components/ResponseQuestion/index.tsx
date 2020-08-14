import QuestionDetails from "containers/QuestionDetails";
import TypeToResponseMap from "models/forms/Questions/TypeToResponseMap";
import { IAppState } from "models/IAppState";
import { IQuestionResponse } from "models/IQuestionResponse";
import React, { FC, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { loadQuestionByIdRoutine } from "sagas/questions/routines";
import { Header, Icon, Label, Segment } from "semantic-ui-react";
import styles from "./styles.module.sass";

const ResponseQuestion: FC<IQuestionResponse & ResponseQuestionProps> =
    ({ question, answerHandler, loadCurrent, nowModifying }) => {
        const { name, categoryTitle, type, id } = question;
        const [editor, setEditor] = useState(false);
        const handleSegmentClick = () => {
            setEditor(!editor);
            loadCurrent(question.id);
        };
        return (<Segment>
            <Icon name='code'
            className={styles.edit}
                onClick={handleSegmentClick} />
            {editor && (id === nowModifying.id) ?
                <QuestionDetails match={{ params: {} }} />
                : <>
                    <Header as='h4'>{name}<Label>{categoryTitle}</Label></Header>
                    {TypeToResponseMap.get(type)?.({ question, answerHandler })}
                </>
            }
        </Segment>);
    };

const mapState = (state: IAppState) => ({
    nowModifying: state.questions.current
});

const mapDispatch = {
    loadCurrent: loadQuestionByIdRoutine
};

const connector = connect(mapState, mapDispatch);

type ResponseQuestionProps = ConnectedProps<typeof connector>;

export default connector(ResponseQuestion);
