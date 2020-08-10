import React, {FC, useEffect} from 'react';
import {useHistory} from "react-router";
import {Button, Card, Dimmer, Loader} from 'semantic-ui-react';
import styles from './styles.module.sass';
import {connect, ConnectedProps} from "react-redux";
import {loadQuestionsRoutine} from './routines';
import {IAppState} from "../../models/IAppState";

const QuestionsList: FC<QuestionsListProps> = ({questions, isLoading, loadQuestions}) => {
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
                    : (questions.map(question => {
                        return (
                            <div key={question.id} className={styles.questionContainer}>
                                <Card className={styles.question}
                                      link centered fluid
                                      description={question.text}
                                      meta={question.categoryTitle}
                                      onClick={() => handleClick(question.id)}/>
                            </div>
                        );
                    }))}
                <div className={styles.addNewButton}>
                    <Button onClick={() => handleClick("new")}>Add new</Button>
                </div>
            </div>
        </div>
    );
};

const mapState = (state: IAppState) => ({
    questions: state.forms.questions,
    isLoading: state.forms.isLoading
});

const mapDispatch = {
    loadQuestions: loadQuestionsRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionsListProps = ConnectedProps<typeof connector>;

export default connector(QuestionsList);

