import React, { useEffect, useState, useCallback } from 'react';
import { IQuestion } from 'models/forms/Questions/IQuesion';
import QuestionCard from 'components/QuestionnaireOrderDraggableView/QuestionCard';
import { Header } from 'semantic-ui-react';
import styles from "./styles.module.sass";
import { connect } from 'react-redux';
import { updateQuestionsOrderRoutine } from 'sagas/sections/routines';

interface IIndex  {
    sectionId: string;
    questions: IIndexObject[];
}

interface IIndexObject  {
    questionId: string;
    index: number;
}

interface ISectionQuestionListProps {
    sectionId: string;
    questions: IQuestion[];
    indexQuestions(questions: IIndex): void;
    handleMoveQuestionToSection(sectionId: string, question: IQuestion, prevSectionId: string): void;

}

const SectionQuestionList: React.FC<ISectionQuestionListProps> = ({
    sectionId,
    questions,
    indexQuestions,
    handleMoveQuestionToSection
  }) => {
    const [questionCards, setQuestionCards] = useState<IQuestion[]>([]);
  
    const indexQuestionsHandler = () => {
      const rst = questions.map((card, i) => { return { questionId: card.id, index: i }; });
      indexQuestions({sectionId: sectionId,  questions: rst});
    };
  
    useEffect(() => {
      setQuestionCards(questions);
    }, [questions]);
  
    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = questionCards[dragIndex];
        const updCards = questionCards.slice();
        updCards.splice(dragIndex, 1);
        updCards.splice(hoverIndex, 0, dragCard);
        setQuestionCards(updCards);
      },
      [questionCards]
    );
  
    const drop = () => {
      indexQuestionsHandler();
    };
    
    const renderCard = (q: IQuestion, index: number, sectionId: string) => {
        return (
          <QuestionCard
            question={q}
            key={index}
            id={q.id}
            index={index}
            moveCard={moveCard}
            onDropCard={drop}
            addQuestionToSection={handleMoveQuestionToSection}
            prevSectionId={sectionId}
          />
        );
    };

    return (
        <div className={styles.wrapper}>
          {questions.length ?
            <div>
              {questionCards.map((q, i) => renderCard(q, i, sectionId))}
            </div>
            : <Header as='h3'>
              Add questions
            </Header>}
        </div>
    );
};

const MapDispatchToProps = {
    updateOrder: updateQuestionsOrderRoutine
};

export default connect(null, MapDispatchToProps) (SectionQuestionList);