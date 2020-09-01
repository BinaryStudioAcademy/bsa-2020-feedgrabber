import React, {FC, useEffect} from 'react';
import {useHistory} from "react-router";
import {Card, Dimmer, Loader} from 'semantic-ui-react';
import styles from './styles.module.sass';
import {connect, ConnectedProps} from "react-redux";
import {loadQuestionsRoutine} from '../../sagas/questions/routines';
import {IAppState} from "../../models/IAppState";
import UIButton from 'components/UI/UIButton';

const QuestionsList: FC<QuestionsListProps> = ({questions, isLoading, loadQuestions, result}) => {
    const history = useHistory();

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);

    const handleClick = id => {
        history.push(`question/${id}`);
    };

    return (
        <div className={styles.container}>
            <h3>Questions</h3>
            <div className={styles.questionsContainer}>
                {isLoading
                    ? <Dimmer active inverted>
                        <Loader size="big" inverted/>
                    </Dimmer>
                    : (questions.map((question, index) => {
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
                <div className={styles.addNewButton}>
                    <UIButton title="Add new" onClick={() => handleClick("new")}/>
                </div>
            </div>
        </div>
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

