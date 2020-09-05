import React, {FC, useEffect, useState} from "react";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {IAppState} from "models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {loadCategoriesRoutine} from "sagas/categories/routines";
import {loadQuestionByIdRoutine} from "../../sagas/questions/routines";
import {isEqual} from 'lodash';
import QuestionDetails from "../../components/QuestionDetails";
import {Loader} from "semantic-ui-react";
import {IComponentState} from "../../components/ComponentsQuestions/IQuestionInputContract";
import styles from "./styles.module.sass";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";
import {addQuestionToSectionRoutine, updateQuestionInSectionRoutine} from "../../sagas/sections/routines";

const QuestionDetailsPage: FC<QuestionDetailsProps & {question: IQuestion}> = (
    {
        question,
        isLoading,
        updateQuestion,
        loadCategories,
        questionnaireId,
        sectionId,
        categories,
        addQuestion
    }) => {
    const [isQuestionDetailsValid, setIsQuestionDetailsValid] = useState(false);
    const [q, setQ] = useState<IQuestion>(
        Object.keys(question).length ? question : defaultQuestion
    );

    const handleQuestionDetailsUpdate = (state: IComponentState<IQuestion>) => {
        const {isCompleted, value} = state;
        setIsQuestionDetailsValid(isCompleted);
        setQ(value);
    };

    const onSubmit = question => {
        if (isQuestionDetailsValid) {
            !question.id ?
                addQuestion({
                    ...question,
                    questionnaireId,
                    sectionId
                }) :
                updateQuestion({
                    ...question,
                    sectionId
                });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isEqual(q, question)) {
                onSubmit(q);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [q, question, onSubmit]);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    return (
        <div className={`${styles.question_container}`}>
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
    isLoading: state.formEditor.isLoading,
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
