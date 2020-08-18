import React from 'react';
import { Segment, List, Button, Form } from 'semantic-ui-react';
import { IQuestion, QuestionType } from '../../models/forms/Questions/IQuesion';
import FreeTextQuestion from '../../components/ComponentsQuestionsResponse/FreeTextQuestion';
import { history } from '../../helpers/history.helper';
import styles from './styles.module.scss';
import { Formik } from 'formik';
import { IComponentState } from 'components/ComponentsQuestionsResponse/IComponentProps';
import { IAppState } from 'models/IAppState';
import { connect } from "react-redux";
import { loadQuestionnaireQuestionsRoutine } from "../../sagas/questions/routines";
import { saveAnswersRoutine } from 'sagas/responseAnswers/routines';
import { IAnswer } from 'models/forms/responseAnswers/types';
import { loadOneQuestionnaireRoutine } from 'sagas/qustionnaires/routines';
import UIPageTitle from 'components/UI/UIPageTitle';
import UIButton from 'components/UI/UIButton';
import UIListItem from "components/UI/UIListItem";
import UIListHeader from 'components/UI/UIListHeader';
import ResponseQuestion from 'components/ResponseQuestion';

interface IQuestionnaireResponseState {
    isCompleted: boolean;
    showErrors: boolean;
}

interface IQuestionnaireResponseProps {
    match: any;
    responseId: string;
    title: string;
    description: string;
    questions: IQuestion[];
    isLoading: boolean;
    loadQuestions(id: string): void;
    loadQuestionnaire(id: string): void;
    saveResponseAnswers(answers: IAnswer<any>[]): void;
}

class QuestionnaireResponse extends React.Component<IQuestionnaireResponseProps, IQuestionnaireResponseState> {

    constructor(props: IQuestionnaireResponseProps) {
        super(props);
        this.state = {
            isCompleted: false,
            showErrors: false
        };
        this.handleComponentChange = this.handleComponentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { loadQuestions, loadQuestionnaire, match } = this.props;
        loadQuestionnaire(match.params.id);
        loadQuestions(match.params.id);
    }

    handleComponentChange(state: IComponentState) {
        const { questions } = this.props;
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
            isCompleted: !completeStates.includes(undefined)
        });
    }

    handleSubmit = () => {
        if (this.state.isCompleted) {
            const answers: IAnswer<any>[] = this.props.questions.map(question => {
                return {
                    questionId: question.id,
                    text: question.answer,
                    responseQuestionnaireId: this.props.responseId
                };
            });
            this.props.saveResponseAnswers(answers);
            history.push("/questionnaires");
        } else {
            this.setState({
                showErrors: true
            });
        }
    }

    render() {
        const { title, questions, description } = this.props;
        const { showErrors } = this.state;
        return (
            <div className={styles.response_container}>
                <UIPageTitle title="Response" />
                <UIListHeader title={title} description={description}></UIListHeader>
                <Formik
                    initialValues={this.state}
                    onSubmit={this.handleSubmit}
                >{formik => (
                    <Form onSubmit={formik.handleSubmit} className={styles.questionsListContainer}>
                        <ul>
                            {questions.map(question => {
                                return (
                                    <UIListItem key={question.id} name={question.name}>
                                        <ResponseQuestion question={question} answerHandler={(id, data) => {
                                            question["answer"] = data;
                                            this.handleComponentChange({
                                                question,
                                                isAnswered: !!data
                                            });
                                        }} />
                                        {showErrors && !question.answer ?
                                            <div className={styles.error_message}>
                                                Please, fill the question</div> : null}
                                    </UIListItem>);
                            })}
                        </ul>
                        <div className={styles.submit}>
                            <UIButton title="Send"></UIButton>
                        </div>

                    </Form>)
                    }
                </Formik>
            </div>);
    }
}

const mapStateToProps = (state: IAppState) => ({
    questions: state.questionnaires.current.questions,
    title: state.questionnaires.current.get.title,
    description: state.questionnaires.current.get.description,
    responseId: state.questionnaires.current.get.id // should be id of response
});

const mapDispatchToProps = {
    loadQuestionnaire: loadOneQuestionnaireRoutine,
    loadQuestions: loadQuestionnaireQuestionsRoutine,
    saveResponseAnswers: saveAnswersRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireResponse);