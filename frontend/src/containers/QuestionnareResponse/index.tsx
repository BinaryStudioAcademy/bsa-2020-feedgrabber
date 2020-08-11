import React, { useEffect } from 'react';
import { Segment, List, Button } from 'semantic-ui-react';
import { IQuestion, QuestionType } from "../../models/IQuesion";
import styles from './styles.module.scss';

interface IQuestionnaireResponceProps {
    title: string;
    questions: IQuestion[];
    answers: {};
    loadQuestions(): void;
    saveResponse(): void;
}

const getQuestion = (question: IQuestion) => {
    switch(question.type) {
        case QuestionType.radio:
            return <span>radio</span>;
        case QuestionType.checkbox:
            return <span>checkbox</span>;
        case QuestionType.multichoice:
            return <span>multichoice</span>;
        case QuestionType.scale:
            return <span>scale</span>;
        case QuestionType.freeText:
            return <span>freeText</span>;
        case QuestionType.date:
            return <span>date</span>;
        default:
            return <div>Something went wrong:(</div>;
    }
};

const QuestionnaireResponse: React.FC<IQuestionnaireResponceProps> = ({
    title,
    questions,
    loadQuestions,
    saveResponse
}
) => {
    useEffect(() => {
        if (!questions){
            loadQuestions();
        }
    },[questions, loadQuestions]);

    return (<div className={styles.response_container}>
        <Segment padded><h1 className={styles.title}>{title}</h1></Segment>
        <List className={styles.questions_list}>
            {questions.map(question => {
                return (
                <List.Item key={question.id}>
                    <Segment className={styles.question_wrapper}>
                        <h2 className={styles.name}>{question.name}</h2>
                        {getQuestion(question)}
                    </Segment>
                </List.Item>);
            })}
        </List>
        <Button onClick={saveResponse}
        >Send</Button>
    </div>);
};

// Mock
const questions: IQuestion[] = [
    {
      id: "1",
      categoryId: "Soft skills",
      name:
        "Can you tell me about a time when you successfully led a team through a sticky situation?",
      type: QuestionType.multichoice,
      details: {
        answerOptions: ["1", "2"]
      }
    },
    {
      id: "2",
      categoryId: "Leadership",
      name: "Are you able to delegate responsibilities efficiently?",
      type: QuestionType.freeText,
      details: {}
    },
    {
      id: "3",
      categoryId: "Leadership",
      name: "Are you able to delegate responsibilities efficiently?",
      type: QuestionType.scale,
      details: {}
    }
  ];

QuestionnaireResponse.defaultProps = {
    title: "Awsome questionnaire",
    questions: questions,
    loadQuestions: () => {console.log("loaded");},
    saveResponse: () => {console.log("saved");}
};
// end of mock

export default QuestionnaireResponse;
