import React, {FC, useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import {Card} from 'semantic-ui-react';
import styles from './styles.module.sass';
import {connect, ConnectedProps} from "react-redux";
import {
    deleteQuestion,
    loadQuestionsRoutine,
    saveQuestionRoutine,
    updateQuestionRoutine
} from '../../sagas/questions/routines';
import {IAppState} from "../../models/IAppState";
import UIButton from 'components/UI/UIButton';
import {useTranslation} from 'react-i18next';
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import LoaderWrapper from "../../components/LoaderWrapper";
import {setCurrentQuestionInSection} from "../../sagas/sections/routines";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import QuestionDetailsForm from "../../components/QuestionForm";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";

const QuestionsList: FC<QuestionsListProps> = ({
                                                   questions,
                                                   isLoading,
                                                   loadQuestions,
                                                   result,
                                                   setCurrentQ,
                                                   current,
                                                   saveNewQuestion,
                                                   deleteQuestion,
                                                   updateQuestion
                                               }) => {
    const [t] = useTranslation();

    const [newPressed, setNewPressed] = useState(false);

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);

    const handleClick = (question: IQuestion) => {
        setNewPressed(!question);
        setCurrentQ(question || defaultQuestion);
    };

    return (
        <>
            <UIPageTitle title={t("Questions")}/>
            <UIContent>
                <LoaderWrapper loading={isLoading}>
                    <UIColumn wide>
                        <UIButton center primary title={t("Add new")} onClick={() => handleClick(null)}/>
                        <br/>
                        <UIContent>
                            <UIColumn>
                                {newPressed && <><p>Add new</p>
                                    <hr/>
                                    <br/>
                                    <QuestionDetailsForm
                                        listEdit={
                                            {
                                                cancel: () => {
                                                    setCurrentQ({});
                                                    newPressed && setNewPressed(false);
                                                },
                                                addQuestion: saveNewQuestion
                                            }
                                        }/></>}
                                <p>Modify existing</p>
                                <hr/>
                                <br/>
                                {(questions.map((question, index) => {
                                    const match = result
                                        .questions
                                        .map(q => q.id)
                                        .includes(question.id);
                                    return (
                                        current?.id === question.id ?
                                            <QuestionDetailsForm listEdit={
                                                {
                                                    cancel: () => {
                                                        setCurrentQ({});
                                                        newPressed && setNewPressed(false);
                                                    },
                                                    deleteQuestion,
                                                    addQuestion: updateQuestion
                                                }
                                            }/>
                                            : <div key={index} className={styles.questionContainer}>
                                                <Card className={`${styles.question} ${match && styles.searched}`}
                                                      link centered fluid
                                                      description={question.name?.length > 70 ?
                                                          question.name.slice(0, 70).concat("...") :
                                                          question.name}
                                                      extra={match && 'Matches searched query!'}
                                                      meta={question.categoryTitle?.length > 70 ?
                                                          question.categoryTitle.slice(0, 70).concat("...") :
                                                          question.categoryTitle}
                                                      onClick={() => handleClick(question)}/>
                                            </div>
                                    );
                                }))}
                            </UIColumn>
                        </UIContent>
                    </UIColumn>
                </LoaderWrapper>
            </UIContent>
        </>
    );
};

const mapState = (state: IAppState) => ({
    questions: state.questions.list,
    isLoading: state.questions.isLoading,
    current: state.formEditor.currentQuestion,
    result: state.search.result
});

const mapDispatch = {
    loadQuestions: loadQuestionsRoutine,
    setCurrentQ: setCurrentQuestionInSection,
    saveNewQuestion: saveQuestionRoutine,
    deleteQuestion: deleteQuestion,
    updateQuestion: updateQuestionRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionsListProps = ConnectedProps<typeof connector>;

export default connector(QuestionsList);

