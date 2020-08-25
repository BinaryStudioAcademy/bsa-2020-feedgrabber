import React, {useRef} from "react";
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import styles from "../../containers/QuestionsList/styles.module.sass";
import {Card} from "semantic-ui-react";
import {DraggableItemTypes, IQuestion} from "../../models/forms/Questions/IQuesion";
import ResponseQuestion from "components/ResponseQuestion";

export interface ICardProps {
  id: string;
  question: IQuestion;
  index: number;
  moveCard(dragIndex: number, hoverIndex: number): void;
  onDropCard(): void;
}

interface IDragItem {
  index: number;
  id: string;
  type: string;
}
export const QuestionCard: React.FC<ICardProps> = ({
  index,
  moveCard,
  onDropCard,
  question
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: DraggableItemTypes.QUESTION_CARD,
    hover(item: IDragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    drop() {
      onDropCard();
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: DraggableItemTypes.QUESTION_CARD, id: question.id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = 1; // isDragging ? 0 : 1;
  drag(drop(ref));
  
  return (
    <div ref={ref}  style={{ opacity }} className={styles.question} >
      <ResponseQuestion question={question} />
      {/* <Card className={styles.question}
        link centered fluid
        description={question.name}
        meta={question.categoryTitle}
      />  */}
    </div>
  );
};
