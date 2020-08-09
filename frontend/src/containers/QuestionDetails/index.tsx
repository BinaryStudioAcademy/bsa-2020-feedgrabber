import React, { ChangeEvent } from "react";
import { History } from "react-router-dom";
import { Modal, Button } from "semantic-ui-react";
import { IQuestion } from "../../models/IQuesion";
import { Formik } from "formik";
import * as Yup from 'yup';

import "./styles.module.sass";

// ----------Mock-----------//
enum QuestionType {
  freeText = "free_text",
  radio = "radio",
  scale = "scale",
  checkbox = " checkbox",
  inputField = "input_field",
  dropDown = "drop-down",
}

// ---------Mock end---------//

interface IQuestionProps {
  saveQuestion(question: IQuestion): void;
  question: IQuestion;
  history: History;
}

interface IQuestionState {
  initialValues: any;
  validationSchema: any;
  question: IQuestion;
  open: boolean;
}

class QuestionDetails extends React.Component<IQuestionProps, IQuestionState> {
  constructor(props: IQuestionProps) {
    super(props);
    this.state = {
      // TODO: generate new id + create default state
      validationSchema: Yup.object({}),
      initialValues: {},
      question: {
        id: "",
        name: "New question",
        categoryId: "",
        type: "free_text"
      },
      open: false
    };

    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getForm = this.getForm.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  // TODO: change to the right location
  onClose = () => {
    this.setState({ ...this.state, open: false });
  };

  onSubmit = () => {
    if (this.state.question.id) {
      this.props.saveQuestion(this.state.question);
      this.setState({ ...this.state, open: false });
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

  onTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      ...this.state,
      question: {
        ...this.state.question,
        type: QuestionType[event.target.value]
      }
    });
  };

  // TODO: change span to the right element
  getForm = (question: IQuestion) => {
    switch (question.type) {
      case "radio":
        return <span></span>; // <RadioButton />;
      case "checkbox":
        return <span></span>; // <CheckBox />;
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
      <Modal
        onClose={() => this.setState({ ...this.state, open: false })}
        onOpen={() => this.setState({ ...this.state, open: true })}
        open={ state.open }
        trigger={<Button>show Modal</Button>}
      >
        <Modal.Header>{state.question.name}</Modal.Header>
        <Modal.Content>
            <Formik
              initialValues={state.initialValues}
              validationSchema={state.validationSchema}
              onSubmit={this.onSubmit}
            >
              {this.getForm(state.question)}
            </Formik>
            
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => this.onClose()}>
            Close
          </Button>
          <Button color="green" onClick={() => this.onSubmit()}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default QuestionDetails;
