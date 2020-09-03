import React, { FC, useEffect, useState } from "react";
import { IQuestion } from "../../models/forms/Questions/IQuesion";
import { IAppState } from "models/IAppState";
import { connect, ConnectedProps } from "react-redux";
import { loadCategoriesRoutine } from "sagas/categories/routines";
import {
    loadQuestionByIdRoutine,
    saveQuestionRoutine
} from "../../sagas/questions/routines";
import { useHistory } from "react-router-dom";
import QuestionDetails from "../../components/QuestionDetails";
import { Button, Loader } from "semantic-ui-react";
import { IComponentState } from "../../components/ComponentsQuestions/IQuestionInputContract";
import styles from "./styles.module.sass";
import {useTranslation} from "react-i18next";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";
import UIButton from "../../components/UI/UIButton";

const QuestionDetailsPage: FC<QuestionDetailsProps & { match; isPreview }> = (
    {
        currentQuestion,
        loadQuestion,
        isLoading,
        saveQuestion,
        loadCategories,
        questionnaireId,
        questionnaireQuestions,
        categories,
        match,
        isPreview
    }) => {
    const history = useHistory();
    const [t] = useTranslation();
    const [isQuestionDetailsValid, setIsQuestionDetailsValid] = useState(false);
  const [question, setQuestion] = useState<IQuestion>(
    Object.keys(currentQuestion).length === 0 ? defaultQuestion : currentQuestion
  );

    const handleQuestionDetailsUpdate = (state: IComponentState<IQuestion>) => {
        const { isCompleted, value } = state;
        setIsQuestionDetailsValid(isCompleted);
        setQuestion(value);
    };

    useEffect(() => {
      loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        if (match.params.id === 'new') {
            loadQuestion({id: ""});
        }
        else {
          if (!isPreview)
              loadQuestion({ id: match.params.id });
        }
    }, [loadQuestion, match.params.id, isPreview]);

    useEffect(() => {
        setQuestion(currentQuestion);
    }, [currentQuestion]);

    const onClose = () => {
        isPreview ? isPreview.close() : history.push("/questions");
    };

    const onSubmit = () => {
        if (isQuestionDetailsValid) {
            match.params.id !== "new" ?
            saveQuestion({
                ...question,
                questionnaireId,
                questionnaireQuestions
            }) :
            saveQuestion({
                ...question
            });
        }
        isPreview ? isPreview.close() : history.goBack();
    };

    return (
        <div className={
          `${styles.question_container} ${isPreview ? styles.question_container_preview :  styles.question_expanded}`
        }>
            {isLoading && (
                <Loader active inline='centered' />
            )}
            {!isLoading && (
                <div>
                    <QuestionDetails
                        key={question.id}
                        currentQuestion={question}
                        categories={categories}
                        onValueChange={handleQuestionDetailsUpdate}
                    />
                    <div className={`${styles.question_actions} ${isPreview ? styles.question_actions_preview : ''}`}>
                        <UIButton title={t("Cancel")} primary onClick={onClose} />
                        <UIButton
                          title={t("Save")}
                          submit
                          onClick={onSubmit}
                          disabled={!isQuestionDetailsValid}
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

const mapState = (state: IAppState) => ({
    currentQuestion: state.questions.current,
    isLoading: state.questions.categories.isLoading,
    categories: state.questions.categories.list,
    questionnaireId: state.sections.questionnaireId,
    questionnaireQuestions: state.questionnaires.current.questions
});

const mapDispatch = {
    saveQuestion: saveQuestionRoutine,
    loadQuestion: loadQuestionByIdRoutine,
    loadCategories: loadCategoriesRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionDetailsProps = ConnectedProps<typeof connector>;

export default connector(QuestionDetailsPage);
