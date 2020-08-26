import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from "react-redux";
import LoaderWrapper from "../../components/LoaderWrapper";
import styles from './styles.module.sass';
import {IQuestion, QuestionType} from "../../models/forms/Questions/IQuesion";
import QuestionnairePreview from 'components/QuestionnairePreview';
import {loadOneQuestionnaireRoutine} from 'sagas/qustionnaires/routines';
import {IAppState} from 'models/IAppState';
import QuestionMenu from "../../components/QuestionMenu";
import { getSectionsByQuestionnaireRoutine } from 'sagas/sections/routines';
import { ISection } from 'models/forms/Sections/types';
import {
    deleteFromQuestionnaireRoutine,
    indexQuestionsRoutine, saveQuestionRoutine
} from "sagas/questions/routines";
import UIContent from "../../components/UI/UIContent";
import { IQuestionnaire } from 'models/forms/Questionnaires/types';

interface IExpandedQuestionnaireProps {
    match: any;
    isLoading: boolean;
    questionnaire: IQuestionnaire;
    sections: ISection[];

    loadOneQuestionnaire(id: string): void;
    loadSections(id: string): void;
}

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
        sections,
        loadSections,
        questionnaireQuestions,
        loadOneQuestionnaire,
        saveQuestion,
        deleteQuestion,
        currentQuestion,
        questions
    }
) => {
    useEffect(() => {
        console.log(match.params.id);
        loadOneQuestionnaire(match.params.id);
        loadSections(match.params.id);
    }, [loadOneQuestionnaire, match.params.id, loadSections]);

    const [question, setQuestion] = useState<IQuestion>(currentQuestion);

    useEffect(() => {
      setQuestion(currentQuestion);
    }, [currentQuestion]);

    const handleDeleteQuestion = () => {
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
                            // currentQuestion={currentQuestion}
                            onDelete={handleDeleteQuestion}
                        />
                    </UIContent>
                </div>
            )}
            
        </LoaderWrapper>
    );
};

const mapStateToProps = (rootState: IAppState) => ({
    questionnaire: rootState.questionnaires.current.get,
    isLoading: rootState.sections.isLoading,
    sections: rootState.sections.list,
    currentQuestion: rootState.questions.current,
    // isLoading: rootState.questionnaires.current.isLoading,
    questions: rootState.questionnaires.current.questions,
    questionnaireQuestions: rootState.questionnaires.current.questions
});

const mapDispatchToProps = {
    loadOneQuestionnaire: loadOneQuestionnaireRoutine,
    loadSections: getSectionsByQuestionnaireRoutine,
    saveQuestion: saveQuestionRoutine,
    deleteQuestion: deleteFromQuestionnaireRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ExpandedQuestionnaireProps = ConnectedProps<typeof connector>;

export default connector(ExpandedQuestionnaire);
