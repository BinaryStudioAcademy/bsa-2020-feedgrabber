import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import LoaderWrapper from "../../components/LoaderWrapper";
import styles from './styles.module.sass';
import QuestionnairePreview from 'components/QuestionnairePreview';
import {loadOneQuestionnaireRoutine} from 'sagas/qustionnaires/routines';
import {IAppState} from 'models/IAppState';
import QuestionMenu from "../../components/QuestionMenu";
import {
    deleteFromQuestionnaireRoutine,
    indexQuestionsRoutine, saveQuestionRoutine
} from "sagas/questions/routines";
import UIContent from "../../components/UI/UIContent";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";

const ExpandedQuestionnaire: React.FC<ExpandedQuestionnaireProps & { match }> = (
    {
        match,
        isLoading,
        questionnaire,
        questionnaireQuestions,
        loadOneQuestionnaire,
        saveQuestion,
        deleteQuestion,
        question,
        questions
    }
) => {
    useEffect(() => {
        loadOneQuestionnaire(match.params.id);
    }, [loadOneQuestionnaire, match.params.id]);

    const handleDeleteQuestion = () => deleteQuestion({questionId: question.id, questionnaireId: match.params.id});

    const addNewQuestion = () =>
        saveQuestion({...defaultQuestion, questionnaireId: match.params.id, questionnaireQuestions});

    const copyQuestion = () => {
      if(!question.id) {
        return;
      }
      saveQuestion({
        ...question,
        id: "",
        name: `${question.name} (copy)`,
        questionnaireId: match.params.id,
        questionnaireQuestions
      });
    };

    return (
        <LoaderWrapper loading={isLoading}>
            {questionnaire && (
                <div className={styles.formDetails}>
                    <h1 className={styles.questionnaireTitle}>{questionnaire.title}</h1>
                    <UIContent>
                        <div className={styles.questions_container}>
                            <QuestionnairePreview
                                indexQuestions={indexQuestionsRoutine}
                                qnId={match.params.id}
                                questions={questions ?? []}
                            />
                        </div>
                        <QuestionMenu
                            addQuestion={addNewQuestion}
                            copyQuestion={copyQuestion}
                            currentQuestion={question}
                            onDelete={handleDeleteQuestion}
                        />
                    </UIContent>
                </div>
            )}
        </LoaderWrapper>
    );
};

const mapStateToProps = (rootState: IAppState) => ({
    question: rootState.questions.current,
    questionnaire: rootState.questionnaires.current.get,
    isLoading: rootState.questionnaires.current.isLoading,
    questions: rootState.questionnaires.current.questions,
    questionnaireQuestions: rootState.questionnaires.current.questions
});

const mapDispatchToProps = {
    loadOneQuestionnaire: loadOneQuestionnaireRoutine,
    saveQuestion: saveQuestionRoutine,
    deleteQuestion: deleteFromQuestionnaireRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ExpandedQuestionnaireProps = ConnectedProps<typeof connector>;

export default connector(ExpandedQuestionnaire);
