import React, {FC} from "react";
import styles from "../../../containers/QuestionsList/styles.module.sass";
import {IQuestion} from "../../../models/forms/Questions/IQuesion";
import ResponseQuestion from "components/ResponseQuestion";
import {Draggable} from "react-beautiful-dnd";

const QuestionCard: FC<CardProps> = (
    {
        question,
        isCurrent,
        index,
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
                    question={question}
                    isCurrent={isCurrent}
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
    setCurrentQuestion?: (x: any) => void;
    isCurrent?: boolean;
}

