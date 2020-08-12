import React from "react";
import {History} from "history";
import {Button, Form, Segment} from "semantic-ui-react";
import {Formik, FormikHelpers, FormikValues} from "formik";
import "./styles.sass";
import DateSelectionQuestionUI from "../../components/ComponentsQuestions/DateSelectionQuestionUI";
import InputField from "../../components/ComponentsQuestions/InputField";
import MultichoiseQuestion from "../../components/ComponentsQuestions/MultichoiseQuestion";
import CheckboxQuestion from "../../components/ComponentsQuestions/CheckboxQuestion";
import ScaleQuestion from "../../components/ComponentsQuestions/ScaleQuestion";
import { IComponentState } from "../../components/ComponentsQuestions/IQuestionInputContract";
import { mainSchema } from "./schemas";
import {IQuestion, QuestionType} from "../../models/forms/Questions/IQuesion";
import RadioButtonQuestionUI from "../../components/ComponentsQuestions/RadioButtonQuestionUI";
import {IAppState} from "../../models/IAppState";
import { connect } from "react-redux";
import { saveQuestionRoutine } from "../../sagas/questions/routines";
import { loadQuestionByIdRoutine } from "../../sagas/questions/routines";

// const questions: IQuestion[] = [
//     {
//         id: "1",
//         categoryTitle: "Soft skills",
//         name:
//             "Can you tell me about a time when you successfully led a team through a sticky situation?",
//         type: QuestionType.multichoice,
//         details: {
//             answerOptions: ["1", "2"]
//         }
//     },
//     {
//         id: "2",
//         categoryTitle: "Leadership",
//         name: "Are you able to delegate responsibilities efficiently?",
//         type: QuestionType.freeText,
//         details: {}
//     },
//     {
//         id: "3",
//         categoryTitle: "Leadership",
//         name: "Are you able to delegate responsibilities efficiently?",
//         type: QuestionType.scale,
//         details: {
//             min: 0,
//             max: 10,
//             minDescription: "",
//             maxDescription: ""
//         }
//     }
// ];

interface IQuestionProps {
    saveQuestion(question: IQuestion): void;
    loadQuestion(id: string): void;

    match: {
        params: {
            id?: string;
        };
    };
    history: History;
}

interface IQuestionState {
    initialValues: any;
    validationSchema: any;
    question: IQuestion;
    isQuestionDetailsValid: boolean;
}

class QuestionDetails extends React.Component<IQuestionProps, IQuestionState> {
    constructor(props: IQuestionProps) {
        super(props);
        this.state = {
            validationSchema: mainSchema,
            initialValues: {name: "", categoryTitle: "" },
            question: {
                id: "",
                name: "",
                categoryTitle: "",
                type: undefined,
                details: undefined
            },
            isQuestionDetailsValid: false
        };
        this.onClose = this.onClose.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.setQuestionType = this.setQuestionType.bind(this);
        this.handleQuestionDetailsUpdate = this.handleQuestionDetailsUpdate.bind(this);
    }

    componentDidMount() {
        const { match, loadQuestion } = this.props;
        match.params.id !== 'new'
            ? loadQuestion(match.params.id)
            : loadQuestion('empty');
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.question || nextProps.question.id === prevState.question.id) {
            return null;
        }
        const type = nextProps.question.type.toLowerCase();
        const details = JSON.parse(nextProps.question.details);
        return nextProps.question && (nextProps.question.id !== prevState.question.id)
            ? { question: { ...nextProps.question, type, details },
                  initialValues: {
                      name: nextProps.question.name,
                      categoryTitle: nextProps.question.categoryTitle
                  }
              }
            : null;
    }

    onClose = () => {
        this.props.history.push("/questions");
    };

    onSubmit = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
        if (this.state.isQuestionDetailsValid) {
            this.setState({...this.state,
                question: { ...this.state.question,
                    name: values.name,
                    categoryTitle: values.categoryTitle }
            });
            this.props.saveQuestion(this.state.question);
            this.props.loadQuestion('empty');
            this.props.history.push("/questions");
        }
    }

    readonly questionTypeOptions = [
        {
            key: "Radio",
            text: "Radio",
            value: QuestionType.radio
        },
        {
            key: "CheckBoxes",
            text: "CheckBoxes",
            value: QuestionType.checkbox
        },
        {
            key: "Multichoice",
            text: "Multichoice",
            value: QuestionType.multichoice
        },
        {
            key: "TextArea",
            text: "TextArea",
            value: QuestionType.freeText
        },
        {
            key: "Scaled",
            text: "Scaled",
            value: QuestionType.scale
        },
        {
            key: "Date",
            text: "Date",
            value: QuestionType.date
        }
    ];

    handleQuestionDetailsUpdate(state: IComponentState<{}>) {
        const {question} = this.state;
        const {isCompleted, value} = state;
        this.setState({
            isQuestionDetailsValid: isCompleted,
            question: {...question, details: value as any}
        });
    }

    renderForm() {
        const {question} = this.state;
        switch (question.type) {
            case QuestionType.radio:
                return (
                  <RadioButtonQuestionUI
                    value={question.details}
                    onValueChange={this.handleQuestionDetailsUpdate} />
                );
            case QuestionType.checkbox:
                return (
                    <CheckboxQuestion
                        onValueChange={this.handleQuestionDetailsUpdate}
                        value={question.details}
                    />
                );
            case QuestionType.multichoice:
                return (
                    <MultichoiseQuestion
                        onValueChange={this.handleQuestionDetailsUpdate}
                        value={question.details}
                    />
                );
            case QuestionType.scale:
                return (
                    <ScaleQuestion
                        onValueChange={this.handleQuestionDetailsUpdate}
                        value={question.details}
                    />
                );
            case QuestionType.freeText:
                return <InputField/>;
            case QuestionType.date:
                return <DateSelectionQuestionUI/>;
            default:
                return <span className="question_default">You should choose the type of the question :)</span>;
        }
    }

    setQuestionType = (data: any) => {
        const type: QuestionType = data.value;
        this.setState({
            ...this.state,
            question: {...this.state.question, type, details: undefined}
        });
    };

    render() {
        const {initialValues, validationSchema, question, isQuestionDetailsValid} = this.state;
        return (
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={this.onSubmit}
            >
                {formik => (
                    <div className="question_container">

                        <Form className="question_form" onSubmit={formik.handleSubmit}>
                            <Segment className="question_header">
                                <Form.Input
                                    className="question_name_input"
                                    fluid
                                    placeholder="Type your question"
                                    type="text"
                                    value={formik.values.name}
                                    name="name"
                                    error={
                                        formik.touched.name && formik.errors.name
                                            ? formik.errors.name
                                            : undefined
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <Form.Input
                                  className="question_name_input"
                                  fluid
                                  placeholder="Type question category"
                                  type="text"
                                  value={formik.values.categoryTitle}
                                  name="categoryTitle"
                                  error={
                                    formik.touched.categoryTitle && formik.errors.categoryTitle
                                      ? formik.errors.categoryTitle
                                      : undefined
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {!question.type &&
                                <Form.Dropdown
                                  selection
                                  options={this.questionTypeOptions}
                                  placeholder={"Choose type"}
                                  onChange={(event, data) => this.setQuestionType(data)}
                                />
                                }
                            </Segment>
                            <Segment className="question_form-answers">
                                {this.renderForm()}
                            </Segment>
                            <Segment className="question_actions">
                                <Button className="ui button" color="red" onClick={this.onClose}>
                                    Cancel
                                </Button>
                                <Button className="ui button" color="green" disabled={!isQuestionDetailsValid}>
                                    Save
                                </Button>
                            </Segment>
                        </Form>
                    </div>
                )}
            </Formik>
        );
    }
}

const mapState = (state: IAppState) => {
  return {
    question: state.questions.current
  };
};

const mapDispatch = {
  saveQuestion: saveQuestionRoutine,
  loadQuestion: loadQuestionByIdRoutine
};

const connector = connect(mapState, mapDispatch);

export default connector(QuestionDetails);
