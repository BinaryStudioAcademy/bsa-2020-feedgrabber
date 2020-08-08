import React, {FunctionComponent} from 'react';
import { useHistory } from "react-router";
import {Card} from 'semantic-ui-react';
import styles from './styles.module.sass';

interface IQuestion {
    id: string;
    category?: string;
    type: 'checkboxes' | 'drop_down' | 'scale' | 'multichoice' | 'free_text' | 'radiobutton'; 
    text: string;
}

interface IQuestionsListProps {
    questions: IQuestion[];
}

const QuestionsList: FunctionComponent<IQuestionsListProps> = ({questions}) => {
    const history = useHistory();
    
    const handleClick = (id: string) => {
        history.push(`question/${id}`);
    };

    return (
        <div className = {styles.container}>
            <h3>Questions</h3>
            <div className={styles.questionsContainer}>
                {questions.map(question => {
                    return (
                            <div key = {question.id} className={styles.questionContainer}>
                                <Card className ={styles.question}
                                    link centered fluid
                                    onClick ={() => handleClick(question.id)}>
                                <Card.Content className={styles.content}>
                                    <Card.Meta>{question.category}</Card.Meta>
                                    <Card.Description>{question.text}</Card.Description>
                                    <Card.Meta className={styles.right}><span>{question.type}</span></Card.Meta>
                                </Card.Content>
                                </Card>
                            </div>
                    );
                })}
            </div>
        </div>
    );
};

const defaulProps: IQuestionsListProps= {
    questions: [
    {
        id: "1",
        category: "Soft skills",
        type: 'free_text',
        text: "Can you tell me about a time when you successfully led a team through a sticky situation?"
    },
    {
        id: "2",
        category: "Leadership",
        type: 'scale',
        text: "Are you able to delegate responsibilities efficiently?"
    }
    ]
};

QuestionsList.defaultProps = defaulProps;

export default QuestionsList;