import { ResponseQuestion } from "components/ResponseQuestion";
import { IAppState } from "models/IAppState";
import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Header } from "semantic-ui-react";

const QuestionnairePreview: FC<QuestionnairePreviewProps> = ({ nowModifying }) => {
    return (
        <>
            <Header as h2>{nowModifying.get.title}</Header>
            { nowModifying.questions.map(q => <ResponseQuestion question={q} />)}
        </>);
};

const mapState = (state: IAppState) => ({
    nowModifying: state.questionnaires.current
});

const connector = connect(mapState, null);

type QuestionnairePreviewProps = ConnectedProps<typeof connector>;

export default connector(QuestionnairePreview);