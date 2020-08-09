import React, { ChangeEvent } from "react";
import { History } from 'history';
import { Button, Form, Segment } from "semantic-ui-react";
import { IQuestion, QuestionType } from "../../models/IQuesion";
import { Formik, FormikProps } from "formik";
import { multichoiceSchema } from "./schemas";
import * as Yup from 'yup';
import "./styles.sass";

const questions: IQuestion[] = [
  {
    id: "1",
    categoryId: "Soft skills",
    name:
      "Can you tell me about a time when you successfully led a team through a sticky situation?",
    type: QuestionType.multichoice,
    answerOptions: ["1", "2"]
  },
  {
    id: "2",
    categoryId: "Leadership",
    name: "Are you able to delegate responsibilities efficiently?",
    type: QuestionType.freeText
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
}
class QuestionDetails extends React.Component<IQuestionProps, IQuestionState> {
  constructor(props: IQuestionProps) {
    super(props);
    this.state = {
      validationSchema: Yup.object({}),
      initialValues: { name: "", answers: [] },
      question: {
        id: "",
        name: "New question",
        categoryId: "",
        type: QuestionType.freeText
      }
    };
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getForm = this.getForm.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.setQuestionType = this.setQuestionType.bind(this);
  }
  componentDidMount() {
    const { match } = this.props;
    this.getQuestion(match.params.id);
  }

  getQuestion = async (id: string) => {
    const question = questions.find(question => question.id === id);
    if (question.type === QuestionType.multichoice) {
      this.setState({
        ...this.state,
        question,
        validationSchema: multichoiceSchema,
        initialValues: { name: question.name, answers: question.answerOptions }
      });
    } else if (question.type === QuestionType.freeText) {
      this.setState({
        ...this.state,
        question,
        validationSchema: {},
        initialValues: { name: question.name }
      });
    }
  }

  onClose = () => {
    this.props.history.push("/questions");
  };
  onSubmit = () => {
    if (this.state.question) {
      this.props.saveQuestion(this.state.question);
      this.props.history.push("/questions");
    }
  };
  onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    if (newName.length > 0) {
      this.setState({
        ...this.state,
        question: { ...this.state.question, name: newName }
      });
    }
  };
  questionTypeOptions = [
    {
      key: 'Radio',
      text: 'Radio',
      value: QuestionType.radio
    }, {
      key: 'CheckBoxes',
      text: 'CheckBoxes',
      value: QuestionType.checkbox
    }, {
      key: 'Multichoice',
      text: 'Multichoice',
      value: QuestionType.multichoice
    }, {
      key: 'TextArea',
      text: 'TextArea',
      value: QuestionType.freeText
    }, {
      key: 'Scaled',
      text: 'Scaled',
      value: QuestionType.scale
    }, {
      key: 'Short answer',
      text: 'Short answer',
      value: QuestionType.inputField
    }
  ];
  getForm = (question: IQuestion, initialValues: any, formik: FormikProps<any>) => {
    switch (question.type) {
      case QuestionType.radio:
        return <span>radio</span>; // <RadioButton />;
      case QuestionType.checkbox:
        return <span>checkbox</span>; // <CheckBox />;
      case QuestionType.multichoice:
        return <span>multichoice</span>; // <MultichoiceQuestion formik={formik}/>;
      case QuestionType.scale:
        return <span>scale</span>; // <Scale />
      case QuestionType.freeText:
        return <span>freeeeeeeeee</span>; // <FreeText/>
      default:
        return <span>Default choice</span>;
    }
  };

  setQuestionType = (data: any) => {
    const type: QuestionType = data.value;
    const { question } = this.state;
    if (type === QuestionType.multichoice || type === QuestionType.checkbox || type === QuestionType.radio) {
      question.type === QuestionType.multichoice
        || question.type === QuestionType.checkbox
        || question.type === QuestionType.radio
        ? this.setState({
          ...this.state, question: {
            ...this.state.question,
            type,
            answerOptions: question.answerOptions
          }
        })
        : this.setState({
          ...this.state, question: {
            ...this.state.question,
            type,
            answerOptions: []
          }
        });
    }
  }

  render() {
    const { initialValues, validationSchema, question } = this.state;
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => console.log('submitted')}
      >
        {
          formik => (
            <Segment className="question_container">
              <Form className="question_form" onSubmit={formik.handleSubmit}>
                <Segment className="question_header">
                    <Form.Input
                      className="question_name_input"
                      fluid
                      placeholder="Type your question"
                      type="text"
                      icon="question"
                      value={formik.values.name}
                      name="name"
                      error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Dropdown
                      selection
                      options={this.questionTypeOptions}
                      placeholder={'choose type'}
                      onChange={(event, data) => this.setQuestionType(data)}
                    />
                </Segment>
                <Segment className="question_form-answers">
                  {this.getForm(question, initialValues, formik)}
                </Segment>
                <Segment className="question_actions">
                  <Button color="red" size="tiny"
                    onClick={this.onClose}>
                    Cancel
                </Button>
                  <Button color="green" size="tiny" onClick={this.onSubmit}>
                    Save
                </Button>
                </Segment>
              </Form>
            </Segment>
          )}
      </Formik>
    );
  }
}
export default QuestionDetails;
