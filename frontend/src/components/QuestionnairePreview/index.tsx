import ResponseQuestion from "components/ResponseQuestion";
import { IAppState } from "models/IAppState";
import React, {FC, useState, useCallback, useEffect} from "react";
import { connect, ConnectedProps } from "react-redux";
import { Header, Button, Segment } from "semantic-ui-react";
import styles from "./styles.module.sass";
import { IQuestion } from "models/forms/Questions/IQuesion";
import { QuestionCard } from "components/QuestionnaireOrderDraggableView/QuestionCard";

const newQuestion: IQuestion = {
  type: undefined,
  categoryTitle: "",
  name: "",
  answer: {} as any,
  id: "",
  isReused: false,
  details: {},
  isRequired: false
};

interface IIndex  {
  questionnaireId: string;
  questions: IIndexObject[];
}

interface IIndexObject  {
  questionId: string;
  index: number;
}

interface IQuestionnairePreviewProps {
  questions: IQuestion[];
  qnId: string;
  indexQuestions(questions: IIndex): void;
}

const QuestionnairePreview: FC<IQuestionnairePreviewProps> = ({
  questions,
  qnId,
  indexQuestions
}) => {
  const [questionCards, setQuestionCards] = useState<IQuestion[]>(questions);

  const indexQuestionsHandler = () => {
    const rst = questions.map((card, i) => { return { questionId: card.id, index: i }; });
    indexQuestions({questionnaireId: qnId,  questions: rst});
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

  const renderCard = (q: IQuestion, index: number) => {
    return (
      <QuestionCard
        question={q}
        key={index}
        id={q.id}
        index={index}
        moveCard={moveCard}
        onDropCard={drop}
      />
    );
  };

  return (
    <div className={styles.wrapper}>
      {questions.length ?
        <div>
          {/* {questions.map(q => <ResponseQuestion question={q} key={q.id} />)} */}
          {questionCards.map((q, i) => renderCard(q, i))}
        </div>
        : <Header as='h2'>
          Urrr... Maybe nothing is modifying right now or you haven`t created any questions yet?
        </Header>
      }
    </div>);
};

export default QuestionnairePreview;
