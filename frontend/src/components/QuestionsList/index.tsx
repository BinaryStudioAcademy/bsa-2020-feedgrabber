import React, { FunctionComponent, useEffect } from 'react';
import { useHistory } from "react-router";
import { Card, Dimmer, Loader, Button, Segment, Header, Icon} from 'semantic-ui-react';
import styles from './styles.module.sass';
import { connect } from "react-redux";
import {loadQuestionsRoutine} from "../../containers/QuestionsList/routines";
import {IQuestion} from "../../models/forms/Questions/types";

interface IQuestionsListProps {
    questions: IQuestion[];
    isLoading: boolean;
    loadQuestions(): void;
}

const QuestionsList: FunctionComponent<IQuestionsListProps> = ({ questions, isLoading, loadQuestions }) => {
    const history = useHistory();

    useEffect(() => {
        if (!questions) {
            loadQuestions();
        }
    }, [questions, loadQuestions]);

    const handleClick = (id: string) => {
        history.push(`question/${id}`);
    };

    return (
        <div className = {styles.container}>
            <h3>Questions</h3>
            <div className={styles.questionsContainer}>
            {isLoading
            ? <Dimmer active inverted>
                  <Loader size="big" inverted />
              </Dimmer>
            : questions? (questions.map(question => {
                  return (
                    <div key = {question.id} className={styles.questionContainer}>
                        <Card className ={styles.question}
                                    link centered fluid
                                    onClick ={() => handleClick(question.id)}>
                                <Card.Content className={styles.content}>
                                    <Card.Meta>{question.categoryTitle}</Card.Meta>
                                    <Card.Description>{question.text}</Card.Description>
                                    <Card.Meta className={styles.right}><span>{question.type}</span></Card.Meta>
                                </Card.Content>
                        </Card>
                    </div>
                  );
              })) :
                <div className={styles.emptyList}>
                <Segment placeholder>
                    <Header icon><Icon name='question' />
                        There are no questions available
                    </Header>
                    <Segment.Inline>
                        <Button primary onClick={() => handleClick("new")}>Add new</Button>
                    </Segment.Inline>
                </Segment>
                </div>}
              <div className={styles.addNewButton}>
                <Button onClick={() => handleClick("new")}>Add new</Button>
              </div>
            </div>
        </div>
    );
};

const mapStateToProps = rootState => ({
    questions: rootState.questions.questions,
    isLoading: rootState.questions.isLoading
});

const mapDispatchToProps = {
    loadQuestions: loadQuestionsRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsList);
