import ResponseQuestion from "components/ResponseQuestion";
import { IAppState } from "models/IAppState";
import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Header } from "semantic-ui-react";
import styles from "./styles.module.sass";

const QuestionnairePreview: FC<QuestionnairePreviewProps> = ({ questions }) => {
    return (
        <div className={styles.wrapper}>
            {questions.length ?
                <>
                    { questions.map(q => <ResponseQuestion question={q} key={q.id}/>)}
                    {/* Pass answerHandler to props if it is not preview */}
                </>
                : <Header as='h2'>
                    Urrr... Maybe nothing is modifying right now or you haven`t created any questions yet?
                </Header>
            }
        </div>);
};

const mapState = (state: IAppState) => ({
    questions: state.questionnaires.current.questions
});

const connector = connect(mapState, null);

type QuestionnairePreviewProps = ConnectedProps<typeof connector>;

export default connector(QuestionnairePreview);
