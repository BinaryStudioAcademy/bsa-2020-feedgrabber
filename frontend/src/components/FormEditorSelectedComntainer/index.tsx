import React, { FC } from 'react';
// import {ContainerProps} from "semantic-ui-react";
// import {IAppState} from "../../models/IAppState";
import QuestionMenu from "../QuestionMenu";
import QuestionDetailsPage from "../../containers/QuestionDeatilsPage";
import { IQuestion } from "../../models/forms/Questions/IQuesion";

// need to be refactor with ResponseQuestion(local props)
interface IProps {
    question: IQuestion;
    handleSegmentClick: Function;
}

const FormEditorSelectedContainer: FC<IProps> = (
    {
        question, handleSegmentClick
    }
) => {
    return (
        <div>
            <QuestionDetailsPage
                match={{ params: {} }}
                isPreview={{ question: question, close: handleSegmentClick }} />
            <QuestionMenu />
        </div>
    );
};

// const mapState = (state: IAppState) => ({
//     currentQuestion: state.questionnaires.currentQuestion
// });

export default FormEditorSelectedContainer;