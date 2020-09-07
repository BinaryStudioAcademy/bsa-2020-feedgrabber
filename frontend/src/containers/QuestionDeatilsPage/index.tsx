import React, {FC, useEffect, useState} from "react";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {IAppState} from "models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {loadCategoriesRoutine} from "sagas/categories/routines";
import {isEqual} from 'lodash';
import QuestionDetails from "../../components/QuestionDetails";
import {Loader} from "semantic-ui-react";
import {IComponentState} from "../../components/ComponentsQuestions/IQuestionInputContract";
import styles from "./styles.module.sass";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";
import {
    addQuestionToSectionRoutine,
    deleteQuestionFromSectionRoutine,
    updateQuestionInSectionRoutine
} from "../../sagas/sections/routines";

const QuestionDetailsPage: FC<QuestionDetailsProps & { question: IQuestion }> = (
    {
        question,
        isLoading,
        updateQuestion,
        loadCategories,
        questionnaireId,
        section,
        deleteQuestion,
        categories,
        sections,
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

    const copyQuestion = () => {
        const s = section ?? sections[sections.length - 1];
        addQuestion({
            ...question,
            name: `${question.name} (copy)`,
            sectionId: s.id,
            index: s.questions.length
        });
    };

    const handleDeleteQuestion = () => deleteQuestion({
        questionId: question.id,
        sectionId: section.id
    });

    const onSubmit = () => {
        if (isQuestionDetailsValid) {
            !q.id ?
                addQuestion({
                    ...q,
                    questionnaireId,
                    sectionId: section.id
                }) :
                updateQuestion({
                    ...q,
                    sectionId: section.id
                });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isEqual(q, question)) {
                onSubmit();
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [q, question, onSubmit]);

    return (
        <div className={`${styles.question_container}`}>
            {isLoading ?
                <Loader active inline='centered'/>
                :
                <QuestionDetails
                    key={question.id}
                    currentQuestion={question}
                    onCopy={copyQuestion}
                    onDelete={handleDeleteQuestion}
                    categories={categories}
                    loadCategories={loadCategories}
                    onValueChange={handleQuestionDetailsUpdate}
                />
            }
        </div>
    );
};

const mapState = (state: IAppState) => ({
    isLoading: state.formEditor.isLoading,
    categories: state.categories.list,
    question: state.formEditor.currentQuestion,
    questionnaireId: state.formEditor.questionnaire.id,
    section: state.formEditor.sections.current,
    sections: state.formEditor.sections.list
});

const mapDispatch = {
    addQuestion: addQuestionToSectionRoutine,
    updateQuestion: updateQuestionInSectionRoutine,
    loadCategories: loadCategoriesRoutine,
    deleteQuestion: deleteQuestionFromSectionRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionDetailsProps = ConnectedProps<typeof connector>;

export default connector(QuestionDetailsPage);
