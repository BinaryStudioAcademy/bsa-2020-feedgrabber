import React from 'react';
import {Form, Message} from 'semantic-ui-react';
import {IQuestion} from '../../models/forms/Questions/IQuesion';
import {history} from '../../helpers/history.helper';
import styles from './styles.module.scss';
import {Formik} from 'formik';
import {IAppState} from 'models/IAppState';
import {connect, ConnectedProps} from "react-redux";
import UIPageTitle from 'components/UI/UIPageTitle';
import UIButton from 'components/UI/UIButton';
import UIListHeader from 'components/UI/UIQuestionListHeader';
import UIListItem from 'components/UI/UIQuestionItemCard';
import ResponseQuestion from 'components/ResponseQuestion';
import LoaderWrapper from 'components/helpers/LoaderWrapper';
import {Translation} from 'react-i18next';
import {IAnswer, IAnswerBody} from "../../models/forms/Response/types";
import {loadResponseFormRoutine, saveResponseRoutine} from "../../sagas/response/routines";

interface IComponentState {
    question: IQuestion;
    isAnswered: boolean;
}

interface IQuestionnaireResponseState {
    isCompleted: boolean;
    showErrors: boolean;
    currentSectionIndex: number;
    answers: IAnswer<IAnswerBody>[];
    oldResponseId: string;
}

class FormResponse extends React.Component<ResponseProps & { match }, IQuestionnaireResponseState> {

    constructor(props) {
        super(props);
        this.state = {
            isCompleted: false,
            showErrors: false,
            currentSectionIndex: 0,
            answers: [],
            oldResponseId: props.response?.id
        };
        this.handleComponentChange = this.handleComponentChange.bind(this);
        this.handleSendClick = this.handleSendClick.bind(this);
    }

    handleComponentChange(state: IComponentState) {
        let updatedQuestions = this.getCurrentSection().questions;
        if (state.isAnswered) {
            updatedQuestions = updatedQuestions.map(q => (
                q.id === state.question?.id ? state.question : q
            ));
        }
        this.setState({isCompleted: !updatedQuestions.map(q => q.answer).includes(undefined)});
    }

    componentDidMount() {
        const {match, loadForm} = this.props;
        loadForm(match.params.id);
    }

    getAnswers = () => this.getCurrentSection()?.questions?.map(question => ({
        questionId: question.id,
        type: question.type,
        body: question.answer
    }))

    handleSendClick = () => {
        // TODO if may cause problems
        if (this.checkIfCompleted()) {
            this.props.saveResponse(
                {
                    id: this.props.requestInfo.id,
                    payload: this.state.answers.concat(this.getAnswers())
                });
            history.goBack();
        } else {
            this.setState({showErrors: true});
        }
    }

    handlePreviousClick = () => {
        this.setState({
            isCompleted: true,
            showErrors: false,
            currentSectionIndex: this.state.currentSectionIndex - 1
        });
    };

    getCurrentSection = () => this.props.sections[this.state.currentSectionIndex]

    checkIfCompleted = () => this.state.isCompleted || this.getCurrentSection().questions.filter(q => !q.answer).length

    handleNextClick = () => {
        if (this.checkIfCompleted()) {
            const answers: IAnswer<IAnswerBody>[] = this.getAnswers();
            this.setState({
                answers: this.state.answers.concat(answers),
                isCompleted: false,
                showErrors: false,
                currentSectionIndex: this.state.currentSectionIndex + 1
            });
        } else {
            this.setState({
                showErrors: true
            });
        }
    };

    answerHandler = (data: IAnswerBody, question) => {
        this.handleComponentChange({...question, answer: data, isAnswered: !!data});
    }

    renderQuestion = (question: IQuestion, showErrors: boolean, t) => (
        <UIListItem key={question.id} name={question.name} category={question.categoryTitle}>
            <ResponseQuestion
                isCurrent={false}
                question={question}
                answerHandler={data => this.answerHandler(data, question)}
            />
            {showErrors && !question.answer &&
            <div className={styles.error_message}>
                {t("Please, fill the question")}
            </div>}
        </UIListItem>
    );

    render() {
        const {sections, isLoading, requestInfo} = this.props;
        const changeable = requestInfo?.changeable;
        const {showErrors, currentSectionIndex} = this.state;
        const {title = '', description = '', questions = []} = sections[currentSectionIndex] || {};
        const isSend = sections.length === currentSectionIndex + 1;
        return (
            <Translation>
                {t =>
                    <>
                        {!changeable ? <Message content="Editing is not allowed"/> :
                            <>
                                <UIPageTitle title={t("Response")}/>
                                <br/>
                                <br/>
                                <LoaderWrapper loading={isLoading}>
                                    <UIListHeader title={title} description={description}/>
                                    <Formik initialValues={this.state} onSubmit={this.handleNextClick}>
                                        {formik => (
                                            <Form onSubmit={formik.handleSubmit}
                                                  className={styles.questionsListContainer}>
                                                <ul>
                                                    {questions.map(q => this.renderQuestion(q, showErrors, t))}
                                                </ul>
                                                <div className={styles.submit}>
                                                    {isSend ?
                                                        <UIButton title={t("Send")} submit
                                                                  onClick={this.handleSendClick}/>
                                                        :
                                                        <UIButton title={t("Next")} submit/>
                                                    }
                                                </div>
                                            </Form>
                                        )
                                        }
                                    </Formik>
                                </LoaderWrapper>
                            </>
                        }
                    </>
                }
            </Translation>
        );
    }
}

const mapState = (state: IAppState) => ({
    requestInfo: state.questionnaireResponse.current.info,
    questionnaire: state.questionnaireResponse.current.info.questionnaire,
    sections: state.questionnaireResponse.current.sections,
    isLoading: state.questionnaireResponse.isLoading
});

const mapDispatch = {
    saveResponse: saveResponseRoutine,
    loadForm: loadResponseFormRoutine
};

const connector = connect(mapState, mapDispatch);

type ResponseProps = ConnectedProps<typeof connector>;

export default connector(FormResponse);

