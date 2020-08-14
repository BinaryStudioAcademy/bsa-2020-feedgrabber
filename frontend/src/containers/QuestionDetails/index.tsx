import React, { useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Formik, FormikValues } from "formik";
import "./styles.sass";
import DateSelectionQuestionUI from "../../components/ComponentsQuestions/DateSelectionQuestionUI";
import InputField from "../../components/ComponentsQuestions/InputField";
import MultichoiseQuestion from "../../components/ComponentsQuestions/MultichoiseQuestion";
import CheckboxQuestion from "../../components/ComponentsQuestions/CheckboxQuestion";
import ScaleQuestion from "../../components/ComponentsQuestions/ScaleQuestion";
import { IComponentState } from "../../components/ComponentsQuestions/IQuestionInputContract";
import { IQuestion, QuestionType } from "../../models/forms/Questions/IQuesion";
import { IAppState } from "models/IAppState";
import { connect, ConnectedProps } from "react-redux";
import { loadCategoriesRoutine } from "sagas/categories/routines";
import { mainSchema } from "./schemas";
import RadioButtonQuestionUI from "../../components/ComponentsQuestions/RadioButtonQuestionUI";
import { saveQuestionRoutine } from "../../sagas/questions/routines";
import { loadQuestionByIdRoutine } from "../../sagas/questions/routines";
import { useHistory } from "react-router-dom";
import FileUploadQuestion from "../../components/ComponentsQuestions/FileUploadQuestion";

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
    loadCategories: () => void;
    categories: string[];
    match: {
        params: {
            id?: string;
        };
    };
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

const QuestionDetails: React.FC<IQuestionProps> = ({
        currentQuestion,
        loadQuestion,
        saveQuestion,
        loadCategories,
        categories,
        match
    }) => {
    const [question, setQuestion] = useState<IQuestion>(currentQuestion);
    const history = useHistory();
    const [isQuestionDetailsValid, setIsQuestionDetailsValid] = useState(false);
    const [addedCategories, setNewCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        match.params.id === 'new'
            ? loadQuestion('empty')
            : loadQuestion(match.params.id);
    }, [loadQuestion, match.params.id]);

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
        },
        {
            key: "fileUpload",
            text: "File upload",
            value: "fileUpload"
        }
    ];

    const handleQuestionDetailsUpdate = (state: IComponentState<{}>) => {
        const { isCompleted, value } = state;
        setIsQuestionDetailsValid(isCompleted);
        setQuestion({ ...question, details: value as any });
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
                return <InputField />;
            case QuestionType.date:
                return <DateSelectionQuestionUI />;
            case QuestionType.fileUpload:
                return <FileUploadQuestion />;
            default:
                return <span className="question_default">You should choose the type of the question :)</span>;
        }
    };

    const setQuestionType = (data: any) => {
        const type: QuestionType = data.value;
        setQuestion({ ...question, type, details: undefined });
    };

    const categoriesOptions = (cat: string[]) => {
        return cat.map(cat => {
            return {
                key: cat,
                value: cat,
                text: cat
            };
        });
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{ name: question.name, categoryTitle: question.categoryTitle }}
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
                  onChange={(e, { value }) => {
                      setQuestion({
                          ...question, name: value as string
                      });
                  }}
                  onBlur={formik.handleBlur}
              />
              <Form.Dropdown
                  placeholder='Choose category or type custom'
                  closeOnBlur
                  allowAdditions
                  additionLabel='Add new category: '
                  onChange={(e, { value }) => {
                      setQuestion({
                          ...question, categoryTitle: value as string
                      });
                  }}
                  value={formik.values.categoryTitle}
                  onAddItem={(e, { value }) => {
                      setNewCategories(
                          [value, ...addedCategories]
                      );
                      setQuestion({
                          ...question, categoryTitle: value as string
                      });
                  }}
                  search
                  selection
                  options={categoriesOptions(
                      [...addedCategories, ...categories])}
              />{' '}
                <Form.Dropdown
                    selection
                    options={questionTypeOptions}
                    placeholder={"Choose type"}
                    onChange={(event, data) => setQuestionType(data)}
                />

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
        currentQuestion: state.questions.current,
        isLoading: state.questions.categories.isLoading,
        categories: state.questions.categories.list
    };
};

const mapDispatch = {
    saveQuestion: saveQuestionRoutine,
    loadQuestion: loadQuestionByIdRoutine,
    loadCategories: loadCategoriesRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionCreateProps = ConnectedProps<typeof connector>;

export default connector(QuestionDetails);
