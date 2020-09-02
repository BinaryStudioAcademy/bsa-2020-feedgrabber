import React, {FC, useEffect} from 'react';
import {useHistory} from "react-router";
import {Card} from 'semantic-ui-react';
import styles from './styles.module.sass';
import {connect, ConnectedProps} from "react-redux";
import {loadQuestionsRoutine} from '../../sagas/questions/routines';
import {IAppState} from "../../models/IAppState";
import UIButton from 'components/UI/UIButton';
import { useTranslation } from 'react-i18next';
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import LoaderWrapper from "../../components/LoaderWrapper";

const QuestionsList: FC<QuestionsListProps> = ({questions, isLoading, loadQuestions, result}) => {
    const history = useHistory();
    const [t] = useTranslation();

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);

    const handleClick = id => {
        history.push(`question/${id}`);
    };

    return (
        <>
            <UIPageTitle title={t("Questions")}/>
            <UIContent>
                <LoaderWrapper loading={isLoading}>
                    <UIColumn wide>
                        <UIButton center primary title={t("Add new")} onClick={() => handleClick("new")}/>
                        <br />
                        {(questions.map((question, index) => {
                            const match = result
                                .questions
                                .map(q => q.id)
                                .includes(question.id);
                            return (
                                <div key={index} className={styles.questionContainer}>
                                    <Card className={`${styles.question} ${match && styles.searched}`}
                                          link centered fluid
                                          description={question.name.length > 70 ?
                                              question.name.slice(0, 70).concat("...") :
                                              question.name}
                                          extra={match && 'Matches searched query!'}
                                          meta={question.categoryTitle.length > 70 ?
                                              question.categoryTitle.slice(0, 70).concat("...") :
                                              question.categoryTitle}
                                          onClick={() => handleClick(question.id)}/>
                                </div>
                            );
                        }))}
                    </UIColumn>
                </LoaderWrapper>
            </UIContent>
        </>
    );
};

const mapState = (state: IAppState) => ({
    questions: state.questions.list,
    isLoading: state.questions.isLoading,
    result: state.search.result
});

const mapDispatch = {
    loadQuestions: loadQuestionsRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionsListProps = ConnectedProps<typeof connector>;

export default connector(QuestionsList);

