import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from "react-redux";
import LoaderWrapper from "../../components/LoaderWrapper";
import styles from './styles.module.sass';
import {IQuestion, QuestionType} from "../../models/forms/Questions/IQuesion";
import QuestionnairePreview from 'components/QuestionnairePreview';
import {loadOneQuestionnaireRoutine} from 'sagas/qustionnaires/routines';
import {IAppState} from 'models/IAppState';
import QuestionMenu from "../../components/QuestionMenu";
import {
    deleteFromQuestionnaireRoutine,
    indexQuestionsRoutine, saveQuestionRoutine
} from "sagas/questions/routines";
import UIContent from "../../components/UI/UIContent";

const newQuestion: IQuestion = {
    type: QuestionType.date,
    categoryTitle: new Date().toString(),
    name: "New Question",
    answer: "",
    id: "",
    isReused: false,
    details: {},
    isRequired: false
};

const ExpandedQuestionnaire: React.FC<ExpandedQuestionnaireProps & { match }> = (
    {
        match,
        isLoading,
        questionnaire,
        questionnaireQuestions,
        loadOneQuestionnaire,
        saveQuestion,
        deleteQuestion,
        currentQuestion,
        questions
    }
) => {
    useEffect(() => {
        loadOneQuestionnaire(match.params.id);
    }, [loadOneQuestionnaire, match.params.id]);

    const [question, setQuestion] = useState<IQuestion>(currentQuestion);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      setQuestion(currentQuestion);
    }, [currentQuestion]);

    const handleDeleteQuestion = () => {
        if (!isValid) {
            return;
        }
        deleteQuestion({questionId: question.id, questionnaireId: match.params.id});
    };

    const addNewQuestion = () => {
        saveQuestion({...newQuestion,
            questionnaireId: match.params.id,
            questionnaireQuestions
        });

    };

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
                            currentQuestion={currentQuestion}
                            onDelete={handleDeleteQuestion}
                        />
                    </UIContent>
                </div>
            )}
        </LoaderWrapper>
    );
};

const mapStateToProps = (rootState: IAppState) => ({
    currentQuestion: rootState.questions.current,
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
