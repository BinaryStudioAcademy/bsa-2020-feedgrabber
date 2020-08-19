import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from "react-redux";
import LoaderWrapper from "../../components/LoaderWrapper";
import styles from './styles.module.sass';
import {IQuestion, QuestionType} from "../../models/forms/Questions/IQuesion";
import QuestionnairePreview from 'components/QuestionnairePreview';
import {loadOneQuestionnaireRoutine} from 'sagas/qustionnaires/routines';
import {IQuestionnaire} from 'models/forms/Questionnaires/types';
import {IAppState} from 'models/IAppState';
import QuestionMenu from "../../components/QuestionMenu";
import {IComponentState} from "../../components/ComponentsQuestions/IQuestionInputContract";
import QuestionD from "../../components/QuestionDetails";
import { RouteComponentProps } from 'react-router-dom';
import {
    addNewQuestionToQuestionnaireRoutine,
    copyQuestionInQuestionnaireRoutine,
    saveQuestionToQuestionnaireRoutine,
    deleteFromQuestionnaireRoutine,
    loadQuestionnaireQuestionsRoutine,
    indexQuestionsRoutine
} from "sagas/questions/routines";

const newQuestion: IQuestion = {
    type: QuestionType.freeText,
    categoryTitle: "",
    name: "",
    answer: "",
    id: "",
    isReused: false,
    details: {}
};

const ExpandedQuestionnaire: React.FC<ExpandedQuestionnaireProps & { match }> = (
    {
        match,
        isLoading,
        questionnaire,
        loadOneQuestionnaire,
        saveAndAddQuestion,
        deleteQuestion,
        copyQuestion,
        currentQuestion
    }
) => {
    useEffect(() => {
        loadOneQuestionnaire(match.params.id);
    }, [loadOneQuestionnaire, match.params.id]);

    const [addNew, setAddNew] = useState(false);
    const [question, setQuestion] = useState<IQuestion>(newQuestion);
    const [isValid, setIsValid] = useState(false);

    const handleOnValueChange = (state: IComponentState<IQuestion>) => {
        setQuestion(state.value);
        setIsValid(state.isCompleted);
    };

    const handleSaveQuestion = (question: IQuestion) => {
        if (!isValid) {
            return;
        }
        saveAndAddQuestion({...question, questionnaireId: match.params.id});
        setAddNew(false);
        setQuestion(question);
    };

    const handleDeleteQuestion = (question: IQuestion) => {
        deleteQuestion({questionId: question.id, questionnaireId: match.params.id});
    };

    return (
        <LoaderWrapper loading={isLoading}>
            {questionnaire && (
                <div className={styles.formDetails}>
                    <h1 className={styles.questionnaireTitle}>{questionnaire.title}</h1>
                    {/* <QuestionnaireOrderView questions={questions} isLoading={isLoading} save={() => {}} /> */}
                    <div className={styles.formPreview}>
                        {addNew && <QuestionD onValueChange={handleOnValueChange}
                                              categories={[]}
                                              currentQuestion={question}
                                              onSave={handleSaveQuestion}
                                              onDelete={() => setAddNew(false)}/>}
                        <QuestionnairePreview
                            indexQuestions={indexQuestionsRoutine}
                            qnId={match.params.id}
                            questions={questionnaire.questions ?? []}
                        />
                        <QuestionMenu
                            addQuestion={() => setAddNew(!addNew)}
                            copyQuestion={copyQuestion}
                            currentQuestion={currentQuestion}
                        />
                    </div>
                </div>
            )}
        </LoaderWrapper>
    );
};

interface IRouterProps {
    id: string;
}

// const mapState = (state: IAppState) => ({
//
// });
//
// const mapDispatch = {
//     deleteQuestion: deleteFromQuestionnaireRoutine,
//     addQuestion: addNewQuestionToQuestionnaireRoutine,
//     copyQuestion: copyQuestionInQuestionnaireRoutine
// };

const mapStateToProps = (rootState: IAppState) => ({
    currentQuestion: rootState.questions.current,
    questionnaire: rootState.questionnaires.current.get,
    isLoading: rootState.questionnaires.current.isLoading
});

const mapDispatchToProps = {
    loadOneQuestionnaire: loadOneQuestionnaireRoutine,
    saveAndAddQuestion: saveQuestionToQuestionnaireRoutine,
    deleteQuestion: deleteFromQuestionnaireRoutine,
    addQuestion: addNewQuestionToQuestionnaireRoutine,
    copyQuestion: copyQuestionInQuestionnaireRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ExpandedQuestionnaireProps = ConnectedProps<typeof connector>;

export default connector(ExpandedQuestionnaire);
