import React, { ChangeEvent } from "react";
import { History } from 'history';
import { Button, Form, Segment } from "semantic-ui-react";
import { IQuestion, QuestionType } from "../../models/IQuesion";
import { Formik, FormikProps } from "formik";
import { multichoiceSchema, radioSchema, checkboxSchema, nameSchema } from "./schemas";
import * as Yup from 'yup';
import * as initialValues from "./initialValues";
import "./styles.sass";
import DateSelectionQuestionUI from "../../components/ComponentsQuestions/DateSelectionQuestionUI";
import FreeTextQuestionUI from "../../components/ComponentsQuestions/FreeTextQuestionUI";
import InputField from "../../components/ComponentsQuestions/InputField";

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
  },
  {
    id: "3",
    categoryId: "Leadership",
    name: "Are you able to delegate responsibilities efficiently?",
    type: QuestionType.scale
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
  type: QuestionType;
}
class QuestionDetails extends React.Component<IQuestionProps, IQuestionState> {
  constructor(props: IQuestionProps) {
    super(props);
    this.state = {
      validationSchema: Yup.object({}),
      initialValues: { name: "", answers: [] },
      question: {
        id: "",
        name: "",
        categoryId: "",
        type: undefined
      },
      type: undefined
    };
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getForm = this.getForm.bind(this);
    this.setQuestionType = this.setQuestionType.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    this.getQuestion(match.params.id);
  }

  getQuestion = async (id: string) => {
    const question = questions.find(question => question.id === id);
    if (id !== "new") {
      if (question.type === QuestionType.multichoice) {
        this.setState({
          ...this.state,
          question,
          validationSchema: multichoiceSchema,
          initialValues: initialValues.Multichoice(question),
          type: question.type
        });
      } else if (question.type === QuestionType.radio) {
        this.setState({
          ...this.state,
          question,
          validationSchema: radioSchema,
          initialValues: initialValues.Radio(question),
          type: question.type
        });
      } else if (question.type === QuestionType.checkbox) {
        this.setState({
          ...this.state,
          question,
          validationSchema: checkboxSchema,
          initialValues: initialValues.Checkbox(question),
          type: question.type
        });
      }
      else if (question.type === QuestionType.freeText) {
        this.setState({
          ...this.state,
          question,
          validationSchema: {},
          initialValues: initialValues.FreeText(question),
          type: question.type
        });
      } else if (question.type === QuestionType.scale) {
        this.setState({
          ...this.state,
          question,
          validationSchema: {},
          initialValues: initialValues.Scale(question),
          type: question.type
        });
      } else if (question.type === QuestionType.date) {
        this.setState({
          ...this.state,
          question,
          validationSchema: {},
          initialValues: initialValues.Date(question),
          type: question.type
        });
      }
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
      key: 'Date',
      text: 'Date',
      value: QuestionType.date
    }
  ];
  getForm = (type: QuestionType, formik: FormikProps<any>) => {
    switch (type) {
      case QuestionType.radio:
        return <span>radio</span>; // <RadioButton />;
      case QuestionType.checkbox:
        return <span>checkbox</span>; // <CheckBox />;
      case QuestionType.multichoice:
        return <span>multichoice</span>; // <MultichoiceQuestion formik={formik}/>;
      case QuestionType.scale:
        return <FreeTextQuestionUI />;
      case QuestionType.freeText:
        return <InputField />;
      case QuestionType.date:
        return <DateSelectionQuestionUI />;
      default:
        return <span className="question_default">Default choice</span>;
    }
  };

  setQuestionType = (data: any) => {
    const type: QuestionType = data.value;
    // if (type === QuestionType.multichoice) {
    //   this.setState({
    //     ...this.state,
    //     validationSchema: multichoiceSchema,
    //     initialValues: initialValues.Multichoice({
    //        id: "", name: "", type: QuestionType.multichoice, categoryId: "", answerOptions: [] 
    //       }),
    //     type
    //   });
    // } else if (type === QuestionType.radio) {
    //   this.setState({
    //     ...this.state,
    //     validationSchema: radioSchema,
    //     initialValues: initialValues.Radio({
    //        id: "", name: "", type: QuestionType.radio, categoryId: "", answerOptions: [] 
    //       })
    //   });
    // } else if (type === QuestionType.checkbox) {
    //   this.setState({
    //     ...this.state,
    //     validationSchema: checkboxSchema,
    //     initialValues: initialValues.Checkbox({
    //        id: "", name: "", type: QuestionType.checkbox, categoryId: "", answerOptions: [] 
    //       }),
    //     type
    //   });
    // }
    // else if (type === QuestionType.freeText) {
    //   this.setState({
    //     ...this.state,
    //     validationSchema: {},
    //     initialValues: initialValues.FreeText({
    //        id: "", name: "", type, categoryId: "" 
    //       }),
    //     type
    //   });
    // } else if (type === QuestionType.scale) {
    //   this.setState({
    //     ...this.state,
    //     validationSchema: {},
    //     initialValues: initialValues.Scale({
    //        id: "", name: "", type: QuestionType.scale, categoryId: "" 
    //       }),
    //     type
    //   });
    // } else if (type === QuestionType.date) {
    //   this.setState({
    //     ...this.state,
    //     validationSchema: {},
    //     initialValues: initialValues.Date({
    //        id: "", name: "", type: QuestionType.date, categoryId: "" 
    //       }),
    //     type
    //   });
    // }
    this.setState({ ...this.state, type });
  }

  render() {
    const { initialValues, validationSchema, type, question } = this.state;
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => console.log('submitted')}
      >
        {
          formik => (
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
                    error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {question.type ?
                    <Form.Dropdown
                      className="question_disabled"
                      selection
                      options={this.questionTypeOptions}
                      placeholder={type} disabled
                      onChange={(event, data) => this.setQuestionType(data)}
                    /> :
                    <Form.Dropdown
                      selection
                      options={this.questionTypeOptions}
                      placeholder={'Choose type'}
                      onChange={(event, data) => this.setQuestionType(data)}
                    />}
                </Segment>
                <Segment className="question_form-answers">
                  {this.getForm(type, formik)}
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
            </div>
          )}
      </Formik>
    );
  }
}
export default QuestionDetails;
