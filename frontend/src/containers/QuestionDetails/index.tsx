import React, {useEffect, useState} from "react";
import {Button, Form, Segment} from "semantic-ui-react";
import {Formik, FormikValues} from "formik";
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
import {connect, ConnectedProps} from "react-redux";
import { saveQuestionRoutine } from "../../sagas/questions/routines";
import { loadQuestionByIdRoutine } from "../../sagas/questions/routines";
import {useHistory} from "react-router-dom";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";

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
  currentQuestion: IQuestion;
  match: {
    params: {
      id?: string;
    };
  };
}

interface IQuestionState {
  initialValues: any;
  validationSchema: any;
  question: IQuestion;
  isQuestionDetailsValid: boolean;
}

const QuestionDetails: React.FC<IQuestionProps> = ({
                                                     currentQuestion,
                                                     loadQuestion,
                                                     saveQuestion,
                                                     match
                                                   }) => {
  const [question, setQuestion] = useState<IQuestion>(currentQuestion);
  const history = useHistory();
  const [isQuestionDetailsValid, setIsQuestionDetailsValid] = useState(false);

  useEffect(() => {
    match.params.id === 'new'
      ? loadQuestion('empty')
      : loadQuestion(match.params.id);
  }, []);

  useEffect(() => {
    setQuestion(currentQuestion);
  }, [currentQuestion]);

  const onClose = () => {
    loadQuestion('empty');
    history.push("/questions");
  };

  const onSubmit = (values: FormikValues) => {
    if (isQuestionDetailsValid) {
      saveQuestion({
        ...question,
        name: values.name,
        categoryTitle: values.categoryTitle
      });
      loadQuestion('empty');
      history.push("/questions");
    }
  };

  const questionTypeOptions = [
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

  const handleQuestionDetailsUpdate = (state: IComponentState<{}>) => {
    const {isCompleted, value} = state;
    setIsQuestionDetailsValid(isCompleted);
    setQuestion({...question, details: value as any});
  };

  const renderForm = () => {
    switch (question.type) {
      case QuestionType.radio:
        return (
          <RadioButtonQuestionUI
            value={question.details}
            onValueChange={handleQuestionDetailsUpdate} />
        );
      case QuestionType.checkbox:
        return (
          <CheckboxQuestion
            onValueChange={handleQuestionDetailsUpdate}
            value={question.details}
          />
        );
      case QuestionType.multichoice:
        return (
          <MultichoiseQuestion
            onValueChange={handleQuestionDetailsUpdate}
            value={question.details}
          />
        );
      case QuestionType.scale:
        return (
          <ScaleQuestion
            onValueChange={handleQuestionDetailsUpdate}
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
  };

  const setQuestionType = (data: any) => {
    const type: QuestionType = data.value;
    setQuestion({...question, type, details: undefined});
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{name: question.name, categoryTitle: question.categoryTitle}}
      validationSchema={mainSchema}
      onSubmit={onSubmit}
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
                options={questionTypeOptions}
                placeholder={"Choose type"}
                onChange={(event, data) => setQuestionType(data)}
              />
              }
            </Segment>
            <Segment className="question_form-answers">
              {renderForm()}
            </Segment>
            <Segment className="question_actions">
              <Button className="ui button" color="red" onClick={onClose}>
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
};

const mapState = (state: IAppState) => {
  return {
    currentQuestion: state.questions.current
  };
};

const mapDispatch = {
  saveQuestion: saveQuestionRoutine,
  loadQuestion: loadQuestionByIdRoutine
};

const connector = connect(mapState, mapDispatch);

export default connector(QuestionDetails);
