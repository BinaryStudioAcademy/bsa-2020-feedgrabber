import React, {FC, useEffect, useState} from "react";
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
import { saveQuestionToQuestionnaireRoutine } from "../../sagas/questions/routines";
import { loadQuestionByIdRoutine } from "../../sagas/questions/routines";
import { useHistory } from "react-router-dom";
import FileUploadQuestion from "../../components/ComponentsQuestions/FileUploadQuestion";

const QuestionDetails: FC<QuestionDetailsProps & {match}> = ({
        currentQuestion,
        questionnaireId,
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
                        categoryTitle: values.categoryTitle,
                        questionnaireId
                });
        }
            history.goBack();
        };

    const handleQuestionDetailsUpdate = (state: IComponentState<{}>) => {
        const { isCompleted, value } = state;
        setIsQuestionDetailsValid(isCompleted);
        setQuestion({ ...question, details: value as any });
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
                  error={(formik.touched.name && formik.errors.name) ?? undefined}
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
              {renderForm(question, handleQuestionDetailsUpdate)}
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

const mapState = (state: IAppState) => ({
        currentQuestion: state.questions.current,
        isLoading: state.questions.categories.isLoading,
        categories: state.questions.categories.list,
        questionnaireId: state.questionnaires.current.get.id
});

const mapDispatch = {
    saveQuestion: saveQuestionToQuestionnaireRoutine,
    loadQuestion: loadQuestionByIdRoutine,
    loadCategories: loadCategoriesRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionDetailsProps = ConnectedProps<typeof connector>;

export default connector(QuestionDetails);

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

const renderForm = (question, handleQuestionDetailsUpdate) => {
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

