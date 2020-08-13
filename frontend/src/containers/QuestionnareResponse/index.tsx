import React from 'react';
import { Segment, List, Button, Form} from 'semantic-ui-react';
import { IQuestion, QuestionType } from '../../models/forms/Questions/IQuesion';
import FreeTextQuestion from '../../components/ComponentsQuestionsResponse/FreeTextQuestion';
import { history } from '../../helpers/history.helper';
import styles from './styles.module.scss';
import { Formik } from 'formik';
import { IComponentState } from 'components/ComponentsQuestionsResponse/IComponentProps';
import { IAppState } from 'models/IAppState';
import { connect } from "react-redux";
import { loadQuestionnaireQuestionsRoutine } from "../../sagas/questions/routines";
import { loadCurrentQuestionnaireRoutine } from 'sagas/qustionnaires/routines';
import { saveAnswersRoutine } from 'sagas/responseAnswers/routines';

interface IQuestionnaireResponseState {
    questions: IQuestion[];
    isCompleted: boolean;
    showErrors: boolean;
}

// TODO: implement saveResponse

interface IQuestionnaireResponseProps {
    match: any;
    title: string;
    questions: IQuestion[];
    isLoading: boolean;
    loadQuestions(id: string): void;
    loadQuestionnaire(id: string): void;
    saveResponseAnswers(answers: IAnswer[]): void;
}

class QuestionnaireResponse extends React.Component<IQuestionnaireResponseProps, IQuestionnaireResponseState> {

    constructor(props: IQuestionnaireResponseProps) {
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
        const { loadQuestions, loadQuestionnaire, match, questions} = this.props;
        loadQuestionnaire(match.params.id);
        loadQuestions(match.params.id);
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
            const answers: IAnswer[] = this.state.questions.map(question => { return {
                questionId: question.id,
                text: question.answer,
                responseQuestionnaireId: this.props.match.id
            };});
            this.props.saveResponseAnswers(answers); 
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
                                                <div className={styles.error_message}>
                                                    Please, fill the question</div> : null}
                                    </Segment>
                                </List.Item>);
                        })}
                    </List>
                    <Button type="submit">Send</Button>
                </Form>)
            }
            </Formik>
        </div>);
    }
}

const mapStateToProps = (state: IAppState) => ({
    questions: state.questionnaires.current.questions,
    title: state.questionnaires.current.get.title
});

const mapDispatchToProps = {
    loadQuestionnaire: loadCurrentQuestionnaireRoutine,
    loadQuestions: loadQuestionnaireQuestionsRoutine,
    saveResponseAnswers: saveAnswersRoutine
};

export default connect(mapStateToProps, mapDispatchToProps) (QuestionnaireResponse);