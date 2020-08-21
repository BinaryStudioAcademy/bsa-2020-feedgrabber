import React, { useState, useCallback } from 'react';
import { QuestionCard } from './QuestionCard';
import {IQuestion} from "models/forms/Questions/IQuesion";
import {Button, Dimmer, Loader} from 'semantic-ui-react';
import styles from './styles.module.sass';

export interface IQuestionnaireOrderViewProps {
  questions: IQuestion[];
  isLoading: boolean;
  save(questions: IQuestion[]): void;
}

const propQuest = [
{
  answer: undefined,
  categoryTitle: "title",
  details: undefined,
  id: "0",
  isReused: true,
  name: "first",
  type: undefined
},
  {
    answer: undefined,
    categoryTitle: "title2",
    details: undefined,
    id: "1",
    isReused: true,
    name: "second",
    type: undefined
  },
  {
    answer: undefined,
    categoryTitle: "title 3",
    details: undefined,
    id: "2",
    isReused: true,
    name: "333",
    type: undefined
  }
] as IQuestion[];

export const QuestionnaireOrderView: React.FC<IQuestionnaireOrderViewProps> = ({
                                                                                 questions,
                                                                                 isLoading,
                                                                                 save
}) => {
  const [cards, setCards] = useState<IQuestion[]>(propQuest);

    const handleSaveButton = () => {
      const questions = cards.map((card, i) => { return {...card, index: i}; });
      save(questions);
    };

    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex];
        const updCards = cards.slice();
        updCards.splice(dragIndex, 1);
        updCards.splice(hoverIndex, 0, dragCard);
        setCards(updCards);
      },
      [cards]
    );

    const drop = () => {
      console.log('dropped');
    };

    const renderCard = (card: IQuestion, index: number) => {
      return (
        <QuestionCard
          onDropCard={drop}
          key={card.id}
          index={index}
          id={card.id}
          question={card}
          moveCard={moveCard}
        />
      );
    };

    return (
      <div className={styles.container}>
        <h3>Questions</h3>
        <div className={styles.questionsContainer}>
          {isLoading
            ? <Dimmer active inverted>
              <Loader size="big" inverted/>
          </Dimmer>
            : <div>{cards.map((card, i) => renderCard(card, i))}</div>
          }
          <div className={styles.saveButton}>
            <Button onClick={() => handleSaveButton()}>Save</Button>
          </div>
        </div>
      </div>
    );
};

export default QuestionnaireOrderView;

