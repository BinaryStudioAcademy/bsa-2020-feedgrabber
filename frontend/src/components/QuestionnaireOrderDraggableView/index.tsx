import React, { useState, useCallback } from 'react';
import { QuestionCard } from './QuestionCard';
import update from 'immutability-helper';
import {IQuestion, QuestionType} from "models/forms/Questions/IQuesion";
import {Button, Dimmer, Loader} from 'semantic-ui-react';
import styles from './styles.module.sass';

export interface IQuestionnaireOrderViewProps {
  questions: IQuestion[];
  isLoading: boolean;
  save(questions: IQuestion[]): void;
}

export const QuestionnaireOrderView: React.FC<IQuestionnaireOrderViewProps> = ({
                                                                                 questions,
                                                                                 isLoading,
                                                                                 save
}) => {
    const [cards, setCards] = useState<IQuestion[]>(questions);

    const handleSaveButton = () => {
      const questions = cards.map((card, i) => update(card, {index: {$set: i}}));
      save(questions);
    };

    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex];
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard]
            ]
          })
        );
      },
      [cards]
    );

    const renderCard = (card: IQuestion, index: number) => {
      return (
        <QuestionCard
          key={card.id}
          index={index}
          id={card.id}
          questionText={card.name}
          categoryTitle={card.categoryTitle}
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

