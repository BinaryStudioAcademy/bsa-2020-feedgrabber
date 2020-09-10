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
import UIContent from "../../components/UI/UIContent";
import UISection from "../../components/UI/UISectionCard";
import UIColumn from "../../components/UI/UIColumn";

interface IQuestionnaireResponseState {
    isCompleted: boolean;
    showErrors: boolean;
    currentSectionIndex: number;
    answers: IAnswer<IAnswerBody>[];
    allAnswers: IAnswer<IAnswerBody>[];
}

class FormResponse extends React.Component<ResponseProps & { match }, IQuestionnaireResponseState> {
    constructor(props) {
        super(props);
        this.state = {
            isCompleted: true,
            showErrors: false,
            currentSectionIndex: 0,
            answers: [],
            allAnswers: []
        };
    }

    componentDidUpdate(prevProps: Readonly<ResponseProps & { match }>) {
        const {isCompleted, answers, currentSectionIndex} = this.state;
        const {sections} = this.props;
        if (prevProps.sections !== sections) {
            this.setState({
                answers: sections[0].questions.map(q => this.parseQuestion(q)).filter(a => !!a.body)
            });
        }
        const currentSection = sections[currentSectionIndex];
        if (!isCompleted && answers.length === currentSection?.questions.length) {
            this.setState({isCompleted: true});
        }
    }

    componentDidMount() {
        const {match, loadForm} = this.props;
        loadForm(match.params.id);
    }

    handleComponentChange = (qs: IQuestion) => {
        const {answers} = this.state;
        const isAdd = !answers.find(a => a.questionId === qs.id);
        const parsed = this.parseQuestion(qs);
        !isAdd ? this.setState({answers: this.state.answers.map(q => q.questionId !== qs.id ? q : parsed)})
            : this.setState({answers: [...answers, parsed]});
    }

    answerHandler = (data: IAnswerBody, question) => {
        this.handleComponentChange({...question, answer: data, isAnswered: !!data});
    }

    parseQuestion = (question: IQuestion) => ({
        questionId: question.id,
        type: question.type,
        body: question.answer
    })

    handleSendClick = () => {
        if (this.isCompleted()) {
            this.props.saveResponse({
                id: this.props.requestInfo.id,
                payload: this.state.allAnswers
            });
            history.goBack();
        } else {
            this.setState({showErrors: true});
        }
    }

    isCompleted = () => this.state.isCompleted

    handleNextClick = () => {
        if (this.isCompleted()) {
            this.setState({
                isCompleted: false,
                showErrors: false,
                answers: this.props.sections[this.state.currentSectionIndex + 1].questions
                    .map(q => this.parseQuestion(q))
                    .filter(a => !!a.body),
                allAnswers: [...this.state.allAnswers, ...this.state.answers],
                currentSectionIndex: this.state.currentSectionIndex + 1
            });
        } else {
            this.setState({
                showErrors: true
            });
        }
    };

    renderQuestion = (question: IQuestion, showErrors: boolean, t) => (
        <div style={{marginBottom: 10}}>
            <ResponseQuestion
                isCurrent={false}
                question={question}
                answerHandler={data => this.answerHandler(data, question)}
            />
            {showErrors && !question.answer &&
            <div className={styles.error_message}>
                {t("Please, fill the question")}
            </div>}
        </div>
    );

    render() {
        const {sections, isLoading, requestInfo} = this.props;
        const changeable = requestInfo?.changeable;
        const answered = requestInfo?.answeredAt;
        const {showErrors, currentSectionIndex} = this.state;
        const {title = '', description = '', questions = []} = sections[currentSectionIndex] || {};
        const isSend = sections.length === currentSectionIndex + 1;
        return (
            <Translation>
                {t =>
                    <>
                    <UIPageTitle title={t("Response")}/>
                    <UIContent>
                        <UIColumn>
                                <>
                                    <LoaderWrapper loading={isLoading}>
                                    {!changeable && answered && <Message warning content="Editing is not allowed"/>}
                                        <UISection ti={title} d={description} />
                                        <Formik initialValues={this.state} onSubmit={this.handleNextClick}>
                                            {formik => (
                                                <Form onSubmit={formik.handleSubmit}
                                                      className={styles.questionsListContainer}>
                                                    <ul>
                                                        {questions.map(q => this.renderQuestion(q, showErrors, t))}
                                                    </ul>
                                                    <div className={styles.submit}>
                                                        {isSend && changeable && answered?
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
                        </UIColumn>
                    </UIContent>
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

