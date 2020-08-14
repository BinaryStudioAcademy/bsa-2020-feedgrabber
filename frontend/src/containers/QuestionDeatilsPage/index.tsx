import React, {useEffect, useState} from "react";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import {IAppState} from "models/IAppState";
import {connect} from "react-redux";
import {loadCategoriesRoutine} from "sagas/categories/routines";
import {saveQuestionRoutine} from "../../sagas/questions/routines";
import {loadQuestionByIdRoutine} from "../../sagas/questions/routines";
import {useHistory} from "react-router-dom";
import QuestionDetails from "../QuestionDetails";
import {Button, Segment} from "semantic-ui-react";
import {IComponentState} from "../../components/ComponentsQuestions/IQuestionInputContract";
import styles from "./styles.module.sass";

interface IQuestionDetailsProps {
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

const QuestionDetailsPage: React.FC<IQuestionDetailsProps> = ({
                                                                  currentQuestion,
                                                                  loadQuestion,
                                                                  saveQuestion,
                                                                  loadCategories,
                                                                  categories,
                                                                  match
                                                              }) => {
    const history = useHistory();
    const [isQuestionDetailsValid, setIsQuestionDetailsValid] = useState(false);
    const [question, setQuestion] = useState<IQuestion>(currentQuestion);
    /* const [addedCategories, setNewCategories] = useState([]);*/

    const handleQuestionDetailsUpdate = (state: IComponentState<IQuestion>) => {
        const {isCompleted, value} = state;
        setIsQuestionDetailsValid(isCompleted); // встановлюємо стейт валід чи ні*/
         setQuestion( value);
    };

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        match.params.id === 'new'
            ? loadQuestion('empty')
            : loadQuestion(match.params.id);
    }, [loadQuestion, match.params.id]);

    const onClose = () => {
        loadQuestion('empty');
        history.push("/questions");
    };

    const onSubmit = () => {
        if (isQuestionDetailsValid) {
            console.log(question);
            saveQuestion(question);
            loadQuestion('empty');
            history.push("/questions");
        }
    };

    return (
        <div className={styles.question_container}>
            <QuestionDetails
                currentQuestion={currentQuestion}
                categories={categories}
                onValueChange={handleQuestionDetailsUpdate}
            />
            <div className={ styles.question_actions}>
                <Button className="ui button" color="red" onClick={onClose}>
                    Cancel
                </Button>
                <Button className="ui button" color="green" disabled={!isQuestionDetailsValid} onClick={onSubmit}>
                    Save
                </Button>
            </div>
        </div>
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

export default connect(mapState, mapDispatch)(QuestionDetailsPage);
