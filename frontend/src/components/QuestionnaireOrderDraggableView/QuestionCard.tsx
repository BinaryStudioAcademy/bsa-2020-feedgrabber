import React, {FC} from "react";
import styles from "../../containers/QuestionsList/styles.module.sass";
import {IQuestion} from "../../models/forms/Questions/IQuesion";
import ResponseQuestion from "components/ResponseQuestion";
import {Draggable} from "react-beautiful-dnd";

export interface ICardProps {
    question: IQuestion;
    isCurrent: boolean;
    index: number;
}

const QuestionCard: FC<ICardProps> = ({question, isCurrent, index}) => (
    <Draggable draggableId={question.id} index={index}>
        {provided => (
            <div
                ref={provided.innerRef}
                className={styles.question}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <ResponseQuestion
                    question={question}
                    isCurrent={isCurrent}
                />
            </div>
        )}
    </Draggable>
);

export default QuestionCard;
