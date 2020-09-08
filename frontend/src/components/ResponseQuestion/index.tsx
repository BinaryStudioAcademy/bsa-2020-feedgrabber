import TypeToResponseMap from "models/forms/Questions/TypeToResponseMap";
import {IQuestionResponse} from "models/IQuestionResponse";
import React, {FC, useLayoutEffect, useRef} from "react";
import {Header, Label, Segment} from "semantic-ui-react";
import styles from "./styles.module.sass";
import QuestionForm from "../QuestionForm";
import {ResponseQuestionProps} from "../Form/QuestionCard/QuestionCard";

const ResponseQuestion: FC<IQuestionResponse<any> & ResponseQuestionProps> = (
    {
        question,
        answerHandler,
        setMenuPos,
        setCurrentQuestion,
        currentQuestion
    }) => {
    const {name, categoryTitle, type} = question;
    const ref = useRef(null);
    const isCurrent = currentQuestion.id === question.id;

    const handleSegmentClick = () => {
        if (!answerHandler && !isCurrent) {
            setCurrentQuestion(question);
        }
    };

    useLayoutEffect(() => {
        isCurrent && setMenuPos(ref?.current?.getBoundingClientRect().y);
    }, [isCurrent, setMenuPos, currentQuestion]);

    return (
        <div ref={ref} onClick={handleSegmentClick}>
            <Segment className={`${styles.container} ${isCurrent && styles.highlight}`}>
                {isCurrent
                    ?
                    <div className={styles.scaleTop}>
                        <QuestionForm/>
                    </div>
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

