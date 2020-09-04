import React, {FC, useEffect, useState} from "react";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {IAppState} from "models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {loadCategoriesRoutine} from "sagas/categories/routines";
import {loadQuestionByIdRoutine, saveQuestionRoutine, updateQuestionRoutine} from "../../sagas/questions/routines";
import QuestionDetails from "../../components/QuestionDetails";
import {Loader} from "semantic-ui-react";
import {IComponentState} from "../../components/ComponentsQuestions/IQuestionInputContract";
import styles from "./styles.module.sass";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";
import {addQuestionToSectionRoutine, updateQuestionInSectionRoutine} from "../../sagas/sections/routines";

const QuestionDetailsPage: FC<QuestionDetailsProps & { match; isPreview }> = (
    {
        currentQuestion,
        loadQuestion,
        isLoading,
        saveQuestion,
        updateQuestion,
        loadCategories,
        questionnaireId,
        sectionId,
        categories,
        match,
        isPreview
    }) => {
    const [isQuestionDetailsValid, setIsQuestionDetailsValid] = useState(false);
    const [question, setQuestion] = useState<IQuestion>(
        Object.keys(currentQuestion).length === 0 ? defaultQuestion : currentQuestion
    );
    const [prevQuestion, setPrevQuestion] = useState<IQuestion>();

    const handleQuestionDetailsUpdate = (state: IComponentState<IQuestion>) => {
        const {isCompleted, value} = state;
        setIsQuestionDetailsValid(isCompleted);
        setQuestion(value);
    };

    const onSubmit = question => {
        if (isQuestionDetailsValid) {
            match.params.id !== "new" ?
                saveQuestion({
                    ...question,
                    questionnaireId,
                    sectionId
                }) :
                updateQuestion({
                    ...question
                });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (prevQuestion !== question) {
                onSubmit(question);
                setPrevQuestion(question);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [question, prevQuestion, onSubmit]);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        if (match.params.id === 'new') {
            loadQuestion({id: ""});
        } else {
            if (!isPreview)
                loadQuestion({id: match.params.id});
        }
    }, [loadQuestion, match.params.id, isPreview]);

    useEffect(() => {
        setQuestion(currentQuestion);
    }, [currentQuestion]);

    return (
        <div className={`${styles.question_container} ${isPreview ? styles.question_container_preview : ''}`}>
            {isLoading ?
                <Loader active inline='centered'/>
                :
                <QuestionDetails
                    key={question.id}
                    currentQuestion={question}
                    categories={categories}
                    onValueChange={handleQuestionDetailsUpdate}
                />
            }
        </div>
    );
};

const mapState = (state: IAppState) => ({
    currentQuestion: state.questions.current,
    isLoading: state.categories.isLoading,
    categories: state.categories.list,
    questionnaireId: state.formEditor.questionnaire.id,
    sectionId: state.formEditor.sections.current.id
});

const mapDispatch = {
    addQuestion: addQuestionToSectionRoutine,
    updateQuestion: updateQuestionInSectionRoutine,
    loadQuestion: loadQuestionByIdRoutine,
    loadCategories: loadCategoriesRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionDetailsProps = ConnectedProps<typeof connector>;

export default connector(QuestionDetailsPage);
