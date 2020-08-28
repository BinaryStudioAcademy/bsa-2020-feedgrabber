import React from 'react';
import {Form} from 'semantic-ui-react';
import {IQuestion} from '../../models/forms/Questions/IQuesion';
import {history} from '../../helpers/history.helper';
import styles from './styles.module.scss';
import {Formik} from 'formik';
import {IAppState} from 'models/IAppState';
import {connect} from "react-redux";
import {IAnswer, IAnswerBody, IQuestionnaireResponse} from 'models/forms/Response/types';
import {loadOneQuestionnaireRoutine, loadOneSavedQuestionnaireRoutine} from 'sagas/qustionnaires/routines';
import UIPageTitle from 'components/UI/UIPageTitle';
import UIButton from 'components/UI/UIButton';
import UIListHeader from 'components/UI/UIQuestionListHeader';
import UIListItem from 'components/UI/UIQuestionItemCard';
import ResponseQuestion from 'components/ResponseQuestion';
import {saveResponseRoutine, getResponseRoutine} from 'sagas/response/routines';
import { loadSectionsByQuestionnaireRoutine } from 'sagas/sections/routines';
import { ISection } from 'models/forms/Sections/types';
import sectionsReducer from 'reducers/section/reducer';
import LoaderWrapper from 'components/LoaderWrapper';

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

interface IQuestionnaireResponseAnswers {
    id: string;
    payload: IAnswer<any>[];
}

interface IQuestionnaireResponseProps {
    match: any; // requestId
    response: IQuestionnaireResponse;
    title: string;
    description: string;
    // questions: IQuestion[];
    isLoading: boolean;
    sections: ISection[];

    loadQuestionnaire(id: string): void;

    loadOneSaved(payload: { questionnaireId: string; responseId: string }): void;

    saveResponseAnswers(answers: IQuestionnaireResponseAnswers): void;

    getResponse(id: string): void;
}

class QuestionnaireResponse extends React.Component<IQuestionnaireResponseProps, IQuestionnaireResponseState> {

    constructor(props: IQuestionnaireResponseProps) {
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
        const {sections} = this.props;
        const {currentSectionIndex} = this.state;
        const questions = sections[currentSectionIndex].questions;
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
        const {match, loadQuestionnaire, getResponse} = this.props;
        loadQuestionnaire(match.params.id);
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

    getAnswers = () => {
        const {sections} = this.props;
        const {currentSectionIndex} = this.state;
        const questions = sections[currentSectionIndex].questions;
        return questions.map(question => {
            return {
                questionId: question.id,
                type: question.type,
                body: question.answer
            };
        });
    }

    handleSendClick = () => {
        if (this.state.isCompleted) {
            const answers: IAnswer<IAnswerBody>[] = this.getAnswers();
            const payload = {
                id: this.props.response.id,
                payload: this.state.answers.concat(answers)
            };
            this.props.saveResponseAnswers(payload);
            history.goBack();
        } else {
            this.setState({
                showErrors: true
            });
        }
    }

    handlePreviousClick = () => {
        this.setState({
            isCompleted: true,
            showErrors: false,
            currentSectionIndex: this.state.currentSectionIndex - 1
        });
    };

    handleNextClick = () => {
        if (this.state.isCompleted) {
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

    render() {
        const {sections, isLoading, match} = this.props;
        const {showErrors, currentSectionIndex} = this.state;
        return (
            <div className={styles.response_container}>
                <UIPageTitle title="Response"/>
                <LoaderWrapper loading={isLoading}>
                <UIListHeader title={sections[currentSectionIndex]?.title}
                description={sections[currentSectionIndex]?.description}/>
                <Formik
                    initialValues={this.state}
                    onSubmit={this.handleNextClick}
                >{formik => (
                    <Form onSubmit={formik.handleSubmit} className={styles.questionsListContainer}>
                        <ul>
                            {sections[currentSectionIndex]?.questions.map(question => {
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
                                        {showErrors && !question.answer?
                                            <div className={styles.error_message}>
                                                Please, fill the question</div> : null}
                                    </UIListItem>);
                            })}
                        </ul>
                        <div className={styles.submit}>
                            {/* {currentSectionIndex !== 0 ? 
                            <UIButton title="Previous" onClick={this.handlePreviousClick}/>:null} */}
                            {sections.length === currentSectionIndex + 1 ? 
                            <UIButton title="Send" onClick={this.handleSendClick}/> :
                                <UIButton title="Next" submit/>}
                        </div>
                    </Form>)}
                </Formik>
                </LoaderWrapper>
            </div>);
    }
}

const mapStateToProps = (state: IAppState) => ({
    questions: state.questionnaires.current.questions,
    title: state.questionnaires.current.get.title,
    description: state.questionnaires.current.get.description,
    response: state.questionnaireResponse.current,
    sections: state.sections.list,
    isLoading: state.sections.isLoading
});

const mapDispatchToProps = {
    saveResponseAnswers: saveResponseRoutine,
    loadOneSaved: loadOneSavedQuestionnaireRoutine,
    loadQuestionnaire: loadSectionsByQuestionnaireRoutine,
    getResponse: getResponseRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireResponse);
