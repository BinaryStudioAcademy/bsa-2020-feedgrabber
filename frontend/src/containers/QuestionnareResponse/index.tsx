import React from 'react';
import {Form} from 'semantic-ui-react';
import {IQuestion} from '../../models/forms/Questions/IQuesion';
import {history} from '../../helpers/history.helper';
import styles from './styles.module.scss';
import {Formik} from 'formik';
import {IAppState} from 'models/IAppState';
import {connect} from "react-redux";
import {IAnswer, IAnswerBody, IQuestionnaireResponse} from 'models/forms/Response/types';
import {loadOneQuestionnaireRoutine} from 'sagas/qustionnaires/routines';
import UIPageTitle from 'components/UI/UIPageTitle';
import UIButton from 'components/UI/UIButton';
import UIListHeader from 'components/UI/UIQuestionListHeader';
import UIListItem from 'components/UI/UIQuestionItemCard';
import ResponseQuestion from 'components/ResponseQuestion';
import {saveResponseRoutine, getResponseRoutine} from 'sagas/response/routines';

interface IComponentState {
    question: IQuestion;
    isAnswered: boolean;
}

interface IQuestionnaireResponseState {
    isCompleted: boolean;
    showErrors: boolean;
    oldResponseId: string;
}

interface IQuestionnaireResponseAnswers {
    id: string;
    payload: IAnswer<any>[];
}

interface IQuestionnaireResponseProps {
    match: any; // requestId
    response: IQuestionnaireResponse;
    title: string;
    description: string;
    questions: IQuestion[];
    isLoading: boolean;

    loadOneSaved(payload: { questionnaireId: string; responseId: string }): void;

    loadQuestionnaire(id: string): void;

    saveResponseAnswers(answers: IQuestionnaireResponseAnswers): void;

    getResponse(id: string): void;
}

class QuestionnaireResponse extends React.Component<IQuestionnaireResponseProps, IQuestionnaireResponseState> {

    constructor(props: IQuestionnaireResponseProps) {
        super(props);
        this.state = {
            isCompleted: false,
            showErrors: false,
            oldResponseId: props.response?.id
        };
        this.handleComponentChange = this.handleComponentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleComponentChange(state: IComponentState) {
        const {questions} = this.props;
        let updatedQuestions: IQuestion[] = questions;
        if (state.isAnswered) {
            updatedQuestions = questions.map(question => {
                if (question.id === state.question.id) {
                    return state.question;
                }
                return question;
            });
        }
        const completeStates = updatedQuestions.map(question => question.answer);
        this.setState({
            isCompleted: !completeStates.includes(undefined)
        });
    }

    componentDidMount() {
        const {match, getResponse} = this.props;
        getResponse(match.params.id);
    }

    componentDidUpdate() {
        const {match, loadQuestionnaire, loadOneSaved, response} = this.props;
        const {oldResponseId} = this.state;
        if (oldResponseId !== response?.id) {
            this.setState({oldResponseId: response?.id});
            !match.params.responseId
                ? loadQuestionnaire(response.questionnaire.id)
                : loadOneSaved({questionnaireId: response.questionnaire.id, responseId: response.id});
        }
    }

    handleSubmit = () => {
        if (this.state.isCompleted) {
            const answers: IAnswer<IAnswerBody>[] = this.props.questions.map(question => {
                return {
                    questionId: question.id,
                    type: question.type,
                    body: question.answer
                };
            });
            const payload = {
                id: this.props.response.id,
                payload: answers
            };
            this.props.saveResponseAnswers(payload);
            history.goBack();
        } else {
            this.setState({
                showErrors: true
            });
        }
    }

    render() {
        const {title, questions, description} = this.props;
        const {showErrors} = this.state;
        return (
            <div className={styles.response_container}>
                <UIPageTitle title="Response"/>
                <UIListHeader title={title} description={description}/>
                <Formik
                    initialValues={this.state}
                    onSubmit={this.handleSubmit}
                >{formik => (
                    <Form onSubmit={formik.handleSubmit} className={styles.questionsListContainer}>
                        <ul>
                            {questions.map(question => {
                                return (
                                    <UIListItem
                                        key={question.id}
                                        name={question.name}
                                        category={question.categoryTitle}>
                                        <ResponseQuestion question={question} answerHandler={(data: IAnswerBody) => {
                                            question["answer"] = data;
                                            this.handleComponentChange({
                                                question,
                                                isAnswered: !!data
                                            });
                                        }}/>
                                        {showErrors && !question.answer ?
                                            <div className={styles.error_message}>
                                                Please, fill the question</div> : null}
                                    </UIListItem>);
                            })}
                        </ul>
                        <div className={styles.submit}>
                            <UIButton title="Send" submit/>
                        </div>
                    </Form>)}
                </Formik>
            </div>);
    }
}

const mapStateToProps = (state: IAppState) => ({
    questions: state.questionnaires.current.questions,
    title: state.questionnaires.current.get.title,
    description: state.questionnaires.current.get.description,
    response: state.questionnaireResponse.current
});

const mapDispatchToProps = {
    loadQuestionnaire: loadOneQuestionnaireRoutine,
    saveResponseAnswers: saveResponseRoutine,
    getResponse: getResponseRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireResponse);
