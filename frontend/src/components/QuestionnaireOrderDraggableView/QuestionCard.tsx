import React, {useRef} from "react";
import { useDrag, useDrop, DropTargetMonitor, DragSourceMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import styles from "../../containers/QuestionsList/styles.module.sass";
import {Card} from "semantic-ui-react";
import {DraggableItemTypes, IQuestion} from "../../models/forms/Questions/IQuesion";
import ResponseQuestion from "components/ResponseQuestion";
import { connect } from "react-redux";
import { addQuestionToSectionRoutine } from "sagas/sections/routines";
import { ISection } from "models/forms/Sections/types";

export interface ICardProps {
  id: string;
  question: IQuestion;
  prevSectionId: string;
  index: number;
  moveCard(dragIndex: number, hoverIndex: number): void;
  onDropCard(): void;
  addQuestionToSection?(sectionId: string, question: IQuestion, prevSectionId: string): void;
}

export interface IDragItem {
  index: number;
  id: string;
  type: string;
}
const QuestionCard: React.FC<ICardProps> = ({
  index,
  moveCard,
  onDropCard,
  question,
  addQuestionToSection,
  prevSectionId
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
    end(item: IDragItem, monitor: DragSourceMonitor ) {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        const sectionId = dropResult.id as string;
        addQuestionToSection(sectionId, question, prevSectionId);
      }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = 1; // isDragging ? 0 : 1;
  drag(drop(ref));
  
  return (
    <div ref={ref}  style={{ opacity }} className={styles.question}>
      <ResponseQuestion question={question} />
      {/* <Card className={styles.question}
        link centered fluid
        description={question.name}
        meta={question.categoryTitle}
      />  */}
    </div>
  );
};

// const MapDispatch = {
//   addQuestionToSection: addQuestionToSectionRoutine
// };

// export default connect(null, MapDispatch)(QuestionCard);
export default QuestionCard;
