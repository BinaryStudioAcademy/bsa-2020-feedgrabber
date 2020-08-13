import React, { useEffect } from "react";
import { History } from "history";
import { Button, DropdownItemProps, Form, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import "./styles.sass";
import DateSelectionQuestionUI from "../../components/ComponentsQuestions/DateSelectionQuestionUI";
import InputField from "../../components/ComponentsQuestions/InputField";
import MultichoiseQuestion from "../../components/ComponentsQuestions/MultichoiseQuestion";
import CheckboxQuestion from "../../components/ComponentsQuestions/CheckboxQuestion";
import ScaleQuestion from "../../components/ComponentsQuestions/ScaleQuestion";
import { IComponentState } from "../../components/ComponentsQuestions/IQuestionInputContract";
import { nameSchema } from "./schemas";
import { IQuestion, QuestionType } from "../../models/forms/Questions/IQuesion";
import { IAppState } from "models/IAppState";
import { connect, ConnectedProps } from "react-redux";
import { loadCategoriesRoutine } from "sagas/categories/routines";

const questions: IQuestion[] = [
    {
        id: "1",
        categoryTitle: "Soft skills",
        name:
            "Can you tell me about a time when you successfully led a team through a sticky situation?",
        type: QuestionType.multichoice,
        details: {
            answerOptions: ["1", "2"]
        }
    },
    {
        id: "2",
        categoryTitle: "Leadership",
        name: "Are you able to delegate responsibilities efficiently?",
        type: QuestionType.freeText,
        details: {}
    },
    {
        id: "3",
        categoryTitle: "Leadership",
        name: "Are you able to delegate responsibilities efficiently?",
        type: QuestionType.scale,
        details: {
            min: 0,
            max: 10,
            minDescription: "",
            maxDescription: ""
        }
    }
];

interface IQuestionProps {
    saveQuestion(question: IQuestion): void;

    match: {
        params: {
            id?: string;
        };
    };
    history: History;
}

interface IQuestionState {
    initialValues: {
        name: string;
        answers: any;
        createdCategories: string[];
    };
    validationSchema: any;
    question: IQuestion;
    isQuestionDetailsValid: boolean;
}

class QuestionDetails extends React.Component<IQuestionProps & CategoriesProps, IQuestionState> {
    constructor(props: IQuestionProps & CategoriesProps) {
        super(props);
        this.state = {
            validationSchema: nameSchema,
            initialValues: { name: "", answers: {}, createdCategories: [] as string[] },
            question: {
                id: "",
                name: "",
                categoryTitle: "",
                type: undefined,
                details: undefined
            },
            isQuestionDetailsValid: true
        };
        this.onClose = this.onClose.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.getQuestion = this.getQuestion.bind(this);
        this.setQuestionType = this.setQuestionType.bind(this);
        this.handleQuestionDetailsUpdate = this.handleQuestionDetailsUpdate.bind(this);
    }

    componentDidMount() {
        const { loadCategories } = this.props;
        loadCategories();
    }

    // onSubmit = () => {
    //     if (this.state.question) {
    //         this.props.saveQuestion(this.state.question);
    //         this.props.history.push("/questions");
    //     }
    // };

    getQuestion = async (id: string) => {
        if (id !== "new") {
            const question = questions.find(question => question.id === id);
            const initialValues = {
                name: question.name,
                answers: question.details,
                createdCategories: [] as string[]
            };
            this.setState({ ...this.state, question, isQuestionDetailsValid: true, initialValues });
        }
    }

    onClose = () => {
        this.props.history.push("/questions");
    };

    onSubmit = () => {
        if (this.state.isQuestionDetailsValid) {
            this.props.saveQuestion(this.state.question);
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
        const { question } = this.state;
        const { isCompleted, value } = state;
        this.setState({
            isQuestionDetailsValid: isCompleted,
            question: { ...question, details: value as any }
        });
    }

    renderForm() {
        const { question } = this.state;
        switch (question.type) {
            case QuestionType.radio:
                return <span>radio</span>; // <RadioButton />;
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
                return <InputField />;
            case QuestionType.date:
                return <DateSelectionQuestionUI />;
            default:
                return <span className="question_default">You should choose the type of the question :)</span>;
        }
    }

    setQuestionType = (data: any) => {
        const type: QuestionType = data.value;
        this.setState({
            ...this.state,
            question: { ...this.state.question, type, details: undefined }
        });
    };

    categoriesOptions = (cat: string[]) => {
        return cat.map(cat => {
            return {
                key: cat,
                value: cat,
                text: cat
            };
        });
    }

    render() {
        const { initialValues, validationSchema, question, isQuestionDetailsValid } = this.state;
        const { categories } = this.props;
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
                                {!question.type &&
                                    <Form.Dropdown
                                        selection
                                        options={this.questionTypeOptions}
                                        placeholder={"Choose type"}
                                        onChange={(event, data) => this.setQuestionType(data)}
                                    />
                                }
                                <Form.Dropdown
                                    placeholder='Choose category or type custom'
                                    closeOnBlur
                                    allowAdditions
                                    additionLabel='Add new category: '
                                    onChange={(e, { value }) => {
                                        this.setState({
                                            question: { ...question, categoryTitle: value as string }
                                        });
                                    }}
                                    value={question.categoryTitle}
                                    onAddItem={(e, { value }) => {
                                        this.setState({
                                            initialValues: {
                                                createdCategories: 
                                                [value as string, ...initialValues.createdCategories],
                                                name: initialValues.name,
                                                answers: initialValues.answers
                                            }
                                        });
                                    }}
                                    search
                                    selection
                                    options={this.categoriesOptions(
                                        [...initialValues.createdCategories, ...categories])}
                                />{' '}
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

const mapState = (state: IAppState) => ({
    isLoading: state.questions.categories.isLoading,
    categories: state.questions.categories.list
});

const mapDispatch = {
    loadCategories: loadCategoriesRoutine
};

const connector = connect(mapState, mapDispatch);

type CategoriesProps = ConnectedProps<typeof connector>;

export default connector(QuestionDetails);
