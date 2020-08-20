import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from "react-redux";
import LoaderWrapper from "../../components/LoaderWrapper";
import styles from './styles.module.sass';
import {IQuestion, QuestionType} from "../../models/forms/Questions/IQuesion";
import QuestionnairePreview from 'components/QuestionnairePreview';
import {loadOneQuestionnaireRoutine} from 'sagas/qustionnaires/routines';
import {IAppState} from 'models/IAppState';
import QuestionMenu from "../../components/QuestionMenu";
import {IComponentState} from "../../components/ComponentsQuestions/IQuestionInputContract";
import QuestionD from "../../components/QuestionDetails";

import {
  addNewQuestionToQuestionnaireRoutine,
  copyQuestionInQuestionnaireRoutine,
  deleteFromQuestionnaireRoutine,
  indexQuestionsRoutine, loadQuestionByIdRoutine
} from "sagas/questions/routines";
import UICard from "../../components/UI/UICard";
import UIColumn from "../../components/UI/UIColumn";
import UIContent from "../../components/UI/UIContent";

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
        currentQuestion,
        questions
    }
) => {
    useEffect(() => {
        loadOneQuestionnaire(match.params.id);
    }, [loadOneQuestionnaire, match.params.id]);

    const [addNew, setAddNew] = useState(false);
    const [question, setQuestion] = useState<IQuestion>(currentQuestion);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      setQuestion(currentQuestion);
    }, [currentQuestion]);

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

    const handleDeleteQuestion = () => {
        deleteQuestion({questionId: question.id, questionnaireId: match.params.id});
    };

    const copyQuestion = () => {
      if(!question.id) {
        return;
      }
      saveAndAddQuestion({
        ...question,
        id: "",
        name: `${question.name} (copy)`,
        questionnaireId: match.params.id
      });
    };

    return (
        <LoaderWrapper loading={isLoading}>
            {questionnaire && (
                <div className={styles.formDetails}>
                    <h1 className={styles.questionnaireTitle}>{questionnaire.title}</h1>
                    {/* <QuestionnaireOrderView questions={questions} isLoading={isLoading} save={() => {}} /> */}
                    <UIContent>
                        <div className={styles.questions_container}>
                            {addNew && <UICard><QuestionD onValueChange={handleOnValueChange}
                                                  categories={[]}
                                                  currentQuestion={question}
                                                  onSave={handleSaveQuestion}
                                                  onDelete={() => setAddNew(false)}/>
                                        </UICard>}
                            <QuestionnairePreview
                                indexQuestions={indexQuestionsRoutine}
                                qnId={match.params.id}
                                questions={questions ?? []}
                            />
                        </div>
                        <QuestionMenu
                            addQuestion={() => setAddNew(!addNew)}
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
    isLoading: rootState.questionnaires.current.isLoading,
    questions: rootState.questionnaires.current.questions
});

const mapDispatchToProps = {
    loadOneQuestionnaire: loadOneQuestionnaireRoutine,
    saveAndAddQuestion: addNewQuestionToQuestionnaireRoutine,
    deleteQuestion: deleteFromQuestionnaireRoutine,
    copyQuestion: copyQuestionInQuestionnaireRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ExpandedQuestionnaireProps = ConnectedProps<typeof connector>;

export default connector(ExpandedQuestionnaire);
