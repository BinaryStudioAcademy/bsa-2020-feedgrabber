import { ResponseQuestion } from "components/ResponseQuestion";
import { History } from "history";
import { IAppState } from "models/IAppState";
import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Button, Header } from "semantic-ui-react";
import styles from "./styles.module.sass";

const QuestionnairePreview: FC<QuestionnairePreviewProps & { history: History }> = ({ nowModifying, history }) => {
    return (
        <div className={styles.wrapper}>
            <Button onClick={() => history.goBack()} content='back to editor' />
            {nowModifying.questions.length ?
                <>
                    <Header as='h2'>{nowModifying.get.title}</Header>
                    { nowModifying.questions.map(q => <ResponseQuestion question={q} />)}
                    {/* Pass answerHandler to props if it is not preview */}
                </>
                : <Header as='h2'>Urrr... Maybe nothing is modifying right now?</Header>
            }
        </div>);
};

const mapState = (state: IAppState) => ({
    nowModifying: state.questionnaires.current
});

const connector = connect(mapState, null);

type QuestionnairePreviewProps = ConnectedProps<typeof connector>;

export default connector(QuestionnairePreview);
