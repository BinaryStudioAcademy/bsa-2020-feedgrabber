import React, { useEffect, useState, useCallback } from 'react';
import { IQuestion } from 'models/forms/Questions/IQuesion';
import QuestionCard from 'components/QuestionnaireOrderDraggableView/QuestionCard';
import { Header } from 'semantic-ui-react';
import styles from "./styles.module.sass";
import { connect } from 'react-redux';
import { updateQuestionsOrderRoutine } from 'sagas/sections/routines';
import {useTranslation} from "react-i18next";

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
    currentQuestion: IQuestion;
    indexQuestions(questions: IIndex): void;
    handleMoveQuestionToSection(sectionId: string, question: IQuestion, prevSectionId: string, index: number): void;
}

const SectionQuestionList: React.FC<ISectionQuestionListProps> = ({
    sectionId,
    questions,
    currentQuestion,
    indexQuestions,
    handleMoveQuestionToSection
  }) => {
    const [t] = useTranslation();
    const [questionCards, setQuestionCards] = useState<IQuestion[]>([]);

    const indexQuestionsHandler = () => {
      const rst = questionCards
        .filter(card => card)
        .map((card, i) => { return { questionId: card.id, index: i }; });
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
        setQuestionCards([...updCards]);
      },
      [questionCards]
    );

    const drop = () => {
      indexQuestionsHandler();
    };

    const renderCard = (q: IQuestion, index: number, sectionId: string) => {
        if (!q) {
          return null;
        }
        return (
          <QuestionCard
            question={q}
            key={index}
            isCurrent={q.id === currentQuestion.id}
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
        {questionCards.length ?
            <div>
              {questionCards.map((q, i) => renderCard(q, i, sectionId))}
            </div>
            : <Header as='h3'>
              {t("Add questions")}
            </Header>}
        </div>
    );
};

export default SectionQuestionList;
