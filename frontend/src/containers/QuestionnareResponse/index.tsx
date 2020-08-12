import React from 'react';
import { Segment, List, Button, Form} from 'semantic-ui-react';
import { IQuestion, QuestionType } from '../../models/IQuesion';
import FreeTextQuestion from '../../components/ComponentsQuestionsResponse/FreeTextQuestion';
import { history } from '../../helpers/history.helper';
import styles from './styles.module.scss';
import { Formik } from 'formik';
import { IComponentState } from 'components/ComponentsQuestionsResponse/IComponentProps';

interface IResponseState {
    questions: IQuestion[];
    isCompleted: boolean;
    showErrors: boolean;
}

// TODO: implement saveResponse and add loadQuestions

interface IResponseProps {
    questionnaireId: string;
    title: string;
    questions: IQuestion[];
    loadQuestions(id: string): void;
    saveResponse(): void;
}

class QuestionnaireResponse extends React.Component<IResponseProps, IResponseState> {
    static defaultProps: { 
        questionnaireId: string; 
        title: string; 
        questions: IQuestion[]; 
        loadQuestions: (id: string) => void; 
        saveResponse: () => void; 
    };

    constructor(props: IResponseProps) {
        super(props);
        this.state = {
            questions: [],
            isCompleted: false,
            showErrors: false
        };
        this.handleComponentChange = this.handleComponentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { loadQuestions, questionnaireId, questions} = this.props;
        loadQuestions(questionnaireId);
        this.setState({
            questions: questions
        });
    }

    handleComponentChange(state: IComponentState) { 
        const { questions } = this.state;
        let updatedQuestions: IQuestion[];
        if (state.isAnswered) {
            updatedQuestions = questions.map(question => {
                if (question.id === state.question.id) {
                    return state.question;
                } return question;
            });
        }
        const completeStates = updatedQuestions.map(question => question.answer);
        this.setState({
            isCompleted: !completeStates.includes(undefined),
            questions: updatedQuestions
        });
    }

    getQuestionForm(question: IQuestion) {
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
                return <FreeTextQuestion question={question} 
                                        handleChange={this.handleComponentChange}/> ;
            case QuestionType.date:
                return <span>date</span>;
            default:
                return <div>Something went wrong:(</div>; // error
        }
    }

    handleSubmit = () => {
        if (this.state.isCompleted) {
            this.props.saveResponse(); 
            history.push("/questionnaires");
        } else {
            this.setState({
                showErrors: true
            });
        }
    }

    render(){
        const { title, questions } = this.props;
        const { showErrors } = this.state;
        return (
        <div className={styles.response_container}>
            <Segment padded><h1 className={styles.title}>{title}</h1></Segment>
            <Formik
                initialValues = {this.state}
                onSubmit = {this.handleSubmit}
            >{formik => (
            <Form onSubmit={formik.handleSubmit}>
                    <List className={styles.questions_list}>
                        {questions.map(question => {
                            return (
                                <List.Item key={question.id}>
                                    <Segment className={styles.question_wrapper}>
                                        <h2 className={styles.name}>{question.name}</h2>
                                            {this.getQuestionForm(question)}
                                            {showErrors && !question.answer? 
                                                <div>Please, fill the question</div> : null}
                                    </Segment>
                                </List.Item>);
                        })}
                    </List>
                    <Button>Send</Button>
                </Form>)
            }
            </Formik>
        </div>);
    }
}

// Mock
const defaultQuestions: IQuestion[] = [
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
      categoryId: "Abilities",
      name: "How do you handle stress and pressure?",
      type: QuestionType.scale,
      details: {}
    }
  ];

QuestionnaireResponse.defaultProps = {
    questionnaireId: "1",
    title: "Awesome questionnaire",
    questions: defaultQuestions,
    loadQuestions: id => {console.log(`loaded ${id}`);},
    saveResponse: () => {console.log("saved");}
};
// end of mock

export default QuestionnaireResponse;
