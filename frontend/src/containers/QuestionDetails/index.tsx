import React, { ChangeEvent } from "react";
import { History } from 'history';
import { Button, Card, Input, Dropdown, Icon, Form, Segment } from "semantic-ui-react";
import { IQuestion } from "../../models/IQuesion";
import { Formik, FormikProps } from "formik";
import * as Yup from 'yup';
import MultichoiceQuestion from "./Multich"

import "./styles.module.sass";

const questions: IQuestion[] = [
    {
      id: "1",
      categoryId: "Soft skills",
      name:
        "Can you tell me about a time when you successfully led a team through a sticky situation?",
      type: "multichoice",
      answerOptions: ["1", "2", "3"]
    },
    {
      id: "2",
      categoryId: "Leadership",
      name: "Are you able to delegate responsibilities efficiently?",
      type: "free_text"
    }
  ]

interface IQuestionProps {
  saveQuestion(question: IQuestion): void;
  history: History;
  match: {
    params: {
      id?: string;
    }
  }
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
      initialValues: {},
      question: {
        id: "",
        name: "New question",
        categoryId: "",
        type: "free_text"
      }
    };

    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getForm = this.getForm.bind(this);
    // this.onTypeChange = this.onTypeChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  // TODO: change to the right location
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

  // onTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   this.setState({
  //     ...this.state,
  //     question: {
  //       ...this.state.question,
  //       type: event.target.value
  //     }
  //   });
  // };

  getForm = (question: IQuestion, initialValues: any, formik: FormikProps<any>) => {
    switch (question.type) {
      case "radio":
        return <span></span>; // <RadioButton />;
      case "checkbox":
        return <span></span>; // <CheckBox />;
        case "multichoice":
        this.setState({
          validationSchema: Yup.object().shape({
            answers: Yup.array()
              .of(Yup
                .string()
                .required(`Answer can't be empty`)
                .max(200, 'Answer must be shorter then 200 symbols')
              )
              .min(3, 'A multiple choice question must contain at least 3 answer choices')
          }),
          initialValues: { options: question.answerOptions }
        })
       return <MultichoiceQuestion options={initialValues.answers} formik={formik} />;
      case "scale":
        return <span></span>; // <Scale />
      case "free_text":
        return <span></span>; // <FreeText/>
      default:
        return <span>Default choice</span>;
    }
  };

  render() {
    const state = this.state;
    return (
    //   <div className="questions_form_feed">
    //     <Card style={{ width: "60%" }} color="blue">
    //       <div className="question_form_content">
    //         <div className="question_form_header">
    //           <Input icon="question" placeholder="question example" />
    //           <Dropdown selection
    //                     options={questionTypeOptions}
    //                     placeholder="Radio by default"
    //                     onChange={
    //                       (event, data) =>
    //                         setQuestionType(data, question.id)
    //                     }
    //           />
    //         </div>
    //         <Formik
    //             enableReinitialize
    //             initialValues={initialValues}
    //             validationSchema={validationSchema}
    //             onSubmit={() => console.log('submitted')}
    //           >
    //             {
    //               formik => (
    //               <Form name="questionForm" size="large" onSubmit={formik.handleSubmit}>
    //                 <Segment>
    //                   <MultichoiceQuestion options={initialValues.answers} formik={formik} />
    //                 </Segment>
    //                 <Button type="submit" label={"sub"} />
    //               </Form>
    //             )}
    //           </Formik>
    //         <div className="form_question_actions">
    //           <Button color="red" icon labelPosition="left" size="tiny"
    //                   onClick={() => deleteQuestion(question.id)}>
    //             <Icon name="close" />
    //             Delete
    //           </Button>
    //         </div>
    //       </div>
    //     </Card>
    //   <Button color="green" icon labelPosition="left" onClick={addQuestion}>
    //     <Icon name="plus" />
    //     Add new question
    //   </Button>
    // </div>

    <Formik
      enableReinitialize
      initialValues={state.initialValues}
      validationSchema={state.validationSchema}
      onSubmit={() => console.log('submitted')}
    >
      {
        formik => (
        <Form name="questionForm" size="large" onSubmit={formik.handleSubmit}>
          <Segment>
            {this.getForm(state.question, state.initialValues, formik)}
          </Segment>
          <Button type="submit" label={"sub"} />
        </Form>
      )}
    </Formik>
    );
  }
}

export default QuestionDetails;
