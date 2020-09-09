import React, {FC, useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import {Card} from 'semantic-ui-react';
import styles from './styles.module.sass';
import {connect, ConnectedProps} from "react-redux";
import {
    deleteQuestionRoutine,
    loadQuestionsRoutine,
    saveQuestionRoutine, setCurrentQuestionRoutine, setQuestionPaginationRoutine,
    updateQuestionRoutine
} from '../../sagas/questions/routines';
import {IAppState} from "../../models/IAppState";
import UIButton from 'components/UI/UIButton';
import {useTranslation} from 'react-i18next';
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import LoaderWrapper from "../../components/helpers/LoaderWrapper";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import QuestionDetailsForm from "../../components/QuestionForm";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";
import GenericPagination from "../../components/helpers/GenericPagination";

const QuestionsList: FC<QuestionsListProps> = ({
                                                   isLoading,
                                                   loadQuestions,
                                                   result,
                                                   setCurrentQ,
                                                   currentQ: current,
                                                   setPagination,
                                                   pagination
                                               }) => {
    const [t] = useTranslation();

    const [newPressed, setNewPressed] = useState(false);

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);

    useEffect(() => {
        setNewPressed(!isEmpty(current) && newPressed);
    }, [current, newPressed]);

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
                                    <div className={styles.questionContainer}>
                                        <QuestionDetailsForm
                                            isList
                                            isListNew
                                            listEdit={
                                                {
                                                    cancel: () => {
                                                        setCurrentQ({});
                                                        newPressed && setNewPressed(false);
                                                    }
                                                }
                                            }/></div>
                                </>}
                                <p>Modify existing</p>
                                <hr/>
                                <br/>
                                <GenericPagination
                                    isLoading={isLoading}
                                    pagination={pagination}
                                    setPagination={setPagination}
                                    loadItems={loadQuestions}
                                    mapItemToJSX={(question: IQuestion) => {
                                        const match = result
                                            .questions
                                            .map(q => q.id)
                                            .includes(question.id);
                                        return (
                                            current?.id === question.id ?
                                                <div className={styles.questionContainer}>
                                                    <QuestionDetailsForm isList listEdit={
                                                        {
                                                            cancel: () => {
                                                                setCurrentQ({});
                                                                newPressed && setNewPressed(false);
                                                            }
                                                        }
                                                    }/></div>
                                                :
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
                                        );
                                    }}
                                />
                            </UIColumn>
                        </UIContent>
                    </UIColumn>
                </LoaderWrapper>
            </UIContent>
        </>
    );
};

const mapState = (state: IAppState) => ({
    isLoading: state.questions.isLoading,
    currentQ: state.questions.currentQuestion,
    pagination: state.questions.pagination,
    result: state.search.result
});

const mapDispatch = {
    loadQuestions: loadQuestionsRoutine,
    setCurrentQ: setCurrentQuestionRoutine,
    saveNewQuestion: saveQuestionRoutine,
    deleteQuestion: deleteQuestionRoutine,
    updateQuestion: updateQuestionRoutine,
    setPagination: setQuestionPaginationRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionsListProps = ConnectedProps<typeof connector>;

export default connector(QuestionsList);

