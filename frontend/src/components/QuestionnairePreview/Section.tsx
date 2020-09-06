import React, { useState, useCallback } from 'react';
import { IQuestion } from 'models/forms/Questions/IQuesion';
import { Droppable } from "react-beautiful-dnd";
import QuestionCard from 'components/QuestionnaireOrderDraggableView/QuestionCard';
import styles from "./styles.module.sass";
import {ISection} from "../../reducers/formEditor/reducer";
import UISection from "../UI/UISectionCard";

interface IIndex  {
    sectionId: string;
    questions: IIndexObject[];
}

interface IIndexObject  {
    questionId: string;
    index: number;
}

interface ISectionProps {
    currentQuestion: IQuestion;
    data: ISection;
    indexQuestions(questions: IIndex): void;
    renameSection(x: any): void;
    handleMoveQuestionToSection(sectionId: string, question: IQuestion, prevSectionId: string, index: number): void;
}

const Section: React.FC<ISectionProps> = ({
    data,
    renameSection,
    currentQuestion,
    indexQuestions,
    handleMoveQuestionToSection
  }) => {
    const [questionCards, setQuestionCards] = useState<IQuestion[]>(data.questions);

    const indexQuestionsHandler = () => {
      const rst = questionCards.map((card, i) => ({ questionId: card.id, index: i }));
      indexQuestions({sectionId: data.id,  questions: rst});
    };

    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = questionCards[dragIndex];
        const updCards = questionCards.slice();
        updCards.splice(dragIndex, 1);
        updCards.splice(hoverIndex, 0, dragCard);
        setQuestionCards([...updCards]);
      },
      [questionCards]
    );

    const handleChapterChange = (id, title, description) =>  renameSection({id, title, description});

    const renderCard = (q: IQuestion, index: number, sectionId: string) => (
        !q ? null :
          <QuestionCard
            question={q}
            key={q.id}
            isCurrent={q.id === currentQuestion.id}
            id={q.id}
            index={index}
            moveCard={moveCard}
            onDropCard={indexQuestionsHandler}
            addQuestionToSection={handleMoveQuestionToSection}
            prevSectionId={sectionId}
          />
    );

    return (
            <Droppable droppableId={data.id}>
                <UISection section={data} onChanged={handleChapterChange}/>
                { provided => (
                        <div className={styles.wrapper}>
                            {questionCards.map((q, i) => renderCard(q, i, data.id))}
                        </div>
                    )
                }
            </Droppable>
    );
};

export default Section;
