import React, { FunctionComponent, useEffect } from 'react';
import { useHistory } from "react-router";
import { Card, Dimmer, Loader, Button } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { connect } from "react-redux";
import { IQuestion } from './reducer';
import { loadQuestionsRoutine } from './routines';

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
            : (questions.map(question => {
                  return (
                    <div key = {question.id} className={styles.questionContainer}>
                        <Card className ={styles.question}
                              link centered fluid
                              description = {question.text}
                              meta={question.category}
                              onClick ={() => handleClick(question.id)}/>
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

const defaultProps: IQuestionsListProps= {
    questions: null,
    isLoading: true,
    loadQuestions() {
        return [
            {
                id: "1",
                category: "Soft skills",
                type: 'free text',
                text: "Can you tell me about a time when you successfully led a team through a sticky situation?"
            },
            {
                id: "2",
                category: "Leadership",
                type: 'scale',
                text: "Are you able to delegate responsibilities efficiently?"
            }
        ];
    }
};

QuestionsList.defaultProps = defaultProps;

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