import React from "react";
import { History } from "history";
import { Button, Form, Segment } from "semantic-ui-react";
import { IQuestion, QuestionType } from "../../models/IQuesion";
import { Formik } from "formik";
import "./styles.sass";
import DateSelectionQuestionUI from "../../components/ComponentsQuestions/DateSelectionQuestionUI";
import FreeTextQuestionUI from "../../components/ComponentsQuestions/FreeTextQuestionUI";
import InputField from "../../components/ComponentsQuestions/InputField";
import MultichoiseQuestion from "../../components/ComponentsQuestions/MultichoiseQuestion";
import { IComponentState } from "../../components/ComponentsQuestions/IQuestionInputContract";
import { nameSchema } from "./schemas";

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
  initialValues: any;
  validationSchema: any;
  question: IQuestion;
  isQuestionDetailsValid: boolean;
}

class QuestionDetails extends React.Component<IQuestionProps, IQuestionState> {
  constructor(props: IQuestionProps) {
    super(props);
    this.state = {
      validationSchema: nameSchema,
      initialValues: { name: "", answers: [] },
      question: {
        id: "",
        name: "",
        categoryId: "",
        type: undefined,
        details: undefined
      },
      isQuestionDetailsValid: false
    };
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.setQuestionType = this.setQuestionType.bind(this);
    this.handleQuestionDetailsUpdate = this.handleQuestionDetailsUpdate.bind(this);
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
          const initialValues = {name: question.name, answers: question.details};
          this.setState({...this.state, question, isQuestionDetailsValid: true, initialValues});
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
        return <span>checkbox</span>; // <CheckBox />;
      case QuestionType.multichoice:
        return (
          <MultichoiseQuestion
            onValueChange={this.handleQuestionDetailsUpdate}
            value={question.details}
          />
        );
      case QuestionType.scale:
        return <FreeTextQuestionUI />;
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

  render() {
    const { initialValues, validationSchema, question, isQuestionDetailsValid } = this.state;
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

export default QuestionDetails;
