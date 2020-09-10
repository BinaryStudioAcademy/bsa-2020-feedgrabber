import TypeToResponseMap from "models/forms/Questions/TypeToResponseMap";
import {IQuestionResponse} from "models/IQuestionResponse";
import React, {FC} from "react";
import {Header, Label, Segment} from "semantic-ui-react";
import styles from "./styles.module.sass";
import QuestionForm from "../QuestionForm";
import {ResponseQuestionProps} from "../Form/QuestionCard/QuestionCard";

const ResponseQuestion: FC<IQuestionResponse<any> & ResponseQuestionProps> = (
    {
        question,
        answerHandler,
        setCurrentQuestion,
        isCurrent
    }) => {
    const {name, categoryTitle, type} = question;

    const handleSegmentClick = () => {
        if (!answerHandler && !isCurrent) {
            setCurrentQuestion(question.id);
        }
    };

    return (
        <div onClick={handleSegmentClick}>
            <Segment className={`${styles.container} ${isCurrent && styles.highlight}`}>
                {isCurrent
                    ?
                    <QuestionForm/>
                    :
                    <div>
                        {!answerHandler && <Header as='h4'>{name}<Label>{categoryTitle}</Label></Header>}
                        {TypeToResponseMap.get(type.toUpperCase())?.
                        ({question, answerHandler, response: question.answer})}
                    </div>
                }
            </Segment>
        </div>);
};

export default ResponseQuestion;

