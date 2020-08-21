import ResponseQuestion from "components/ResponseQuestion";
import { IAppState } from "models/IAppState";
import React, { FC, useState, useCallback } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Header, Button, Segment } from "semantic-ui-react";
import styles from "./styles.module.sass";
import SelectQuestionsFromExisting from "components/SelectQuestionsFromExisting";
import QuestionD from "components/QuestionDetails";
import { IQuestion } from "models/forms/Questions/IQuesion";
import { IComponentState } from "../ComponentsQuestions/IQuestionInputContract";
import {
  addNewQuestionToQuestionnaireRoutine,
  loadQuestionnaireQuestionsRoutine,
  indexQuestionsRoutine
} from "sagas/questions/routines";
import { QuestionCard } from "components/QuestionnaireOrderDraggableView/QuestionCard";

const newQuestion: IQuestion = {
  type: undefined,
  categoryTitle: "",
  name: "",
  answer: "",
  id: "",
  isReused: false,
  details: {}
};

const QuestionnairePreview: FC<QuestionnairePreviewProps> = ({
  questions,
  saveAndAddQuestion,
  qnId,
  indexQuestions,
  setQuestions
}) => {
  const [addNew, setAddNew] = useState(false);
  const [question, setQuestion] = useState<IQuestion>(newQuestion);
  const [isValid, setIsValid] = useState(false);

  const handleCancel = () => {
    setAddNew(false);
    setQuestion(newQuestion);
  };

  const handleOnValueChange = (state: IComponentState<IQuestion>) => {
    setQuestion(state.value);
    setIsValid(state.isCompleted);
  };

  const handleNewQuestionSave = () => {
    if (!isValid) {
      return;
    }
    saveAndAddQuestion({ ...question, questionnaireId: qnId });
    setAddNew(false);
    setQuestion(newQuestion);
  };

  const indexQuestionsHandler = () => {
    const rst = questions.map((card, i) => { return { questionId: card.id, index: i }; });
    indexQuestions({questionnaireId: qnId,  questions: rst});
  };

  // const orderIndeces = useEffect(() => {
  //   indexQuestionsHandler();
  // },[questions.length]);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = questions[dragIndex];
      const updCards = questions.slice();
      updCards.splice(dragIndex, 1);
      updCards.splice(hoverIndex, 0, dragCard);
      setQuestions(updCards);
    },
    [questions, setQuestions]
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
      <div className={styles.addButtonsBlock}>
        <SelectQuestionsFromExisting />
        <Button onClick={() => setAddNew(true)}>Add New</Button>
      </div>
      {addNew &&
        <Segment>
          <QuestionD
              onValueChange={handleOnValueChange}
              categories={[]}
              currentQuestion={question}
          />
          <Button floated="right" onClick={handleNewQuestionSave} color="green">Save</Button>
          <Button floated="right" onClick={handleCancel}>Cancel</Button>
        </Segment>}
      {questions.length ?
        <div>
          {/* {questions.map(q => <ResponseQuestion question={q} key={q.id} />)} */}
          {questions.map((q, i) => renderCard(q, i))}
          {/* Pass answerHandler to props if it is not preview */}
        </div>
        : <Header as='h2'>
          Urrr... Maybe nothing is modifying right now or you haven`t created any questions yet?
        </Header>
      }
    </div>);
};

const mapState = (state: IAppState) => ({
  qnId: state.questionnaires.current.get.id,
  questions: state.questionnaires.current.questions
});

const mapDispatch = {
  saveAndAddQuestion: addNewQuestionToQuestionnaireRoutine,
  setQuestions: loadQuestionnaireQuestionsRoutine.success,
  indexQuestions: indexQuestionsRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionnairePreviewProps = ConnectedProps<typeof connector>;

export default connector(QuestionnairePreview);
