import React, {FC} from "react";
import styles from "../../../containers/QuestionsList/styles.module.sass";
import {IQuestion} from "../../../models/forms/Questions/IQuesion";
import ResponseQuestion from "components/ResponseQuestion";
import {Draggable} from "react-beautiful-dnd";

const QuestionCard: FC<CardProps> = (
    {
        question,
        currentQuestion,
        index,
        setMenuPos,
        setCurrentQuestion
    }) => (
    <Draggable draggableId={question.id} index={index}>
        {provided => (
            <div
                ref={provided.innerRef}
                className={styles.question}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <ResponseQuestion
                    setCurrentQuestion={setCurrentQuestion}
                    setMenuPos={setMenuPos}
                    question={question}
                    currentQuestion={currentQuestion}
                />
            </div>
        )}
    </Draggable>
);

export default QuestionCard;

export type CardProps = {
    question: IQuestion;
    index: number;
} & ResponseQuestionProps;

export type ResponseQuestionProps = {
    setMenuPos: (x: any) => void;
    setCurrentQuestion: (x: any) => void;
    currentQuestion?: IQuestion;
}

