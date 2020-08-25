import ResponseQuestion from "components/ResponseQuestion";
import { IAppState } from "models/IAppState";
import React, { FC, useState, useCallback, useEffect } from "react";
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
  indexQuestionsRoutine, 
  loadQuestionsBySectionRoutine
} from "sagas/questions/routines";
import QuestionCard from "components/QuestionnaireOrderDraggableView/QuestionCard";
import { ISection } from "models/forms/Sections/types";
import UISection from "components/UI/UISectionCard";
import SectionBlock from "components/SectionBlock";
import { updateSectionsRoutine,
   addQuestionToSectionRoutine,
    deleteQuestionFromSectionRoutine } from "sagas/sections/routines";

const newQuestion: IQuestion = {
  type: undefined,
  categoryTitle: "",
  name: "",
  answer: {} as any,
  id: "",
  isReused: false,
  details: {}
};

interface IQuestionnairePreviewProps {
  sections: ISection[];
  questions: IQuestion[];
  qnId: string;
  saveAndAddQuestion(action: {}): void;
  indexQuestions(action: {}): void;
  setQuestionnaireQuestions(action: {}): void;
  updateSections(sections: ISection[]): void;
  addQuestionToSection(sectionId: string, questionId: string): void;
  deleteQuestionFromSection(sectionId: string, questionId: string): void;
}

interface ISectionState {
  questions: IQuestion[];
}

const QuestionnairePreview: FC<QuestionnairePreviewProps> = ({ 
  qnId,
  sections,
  questions,
  saveAndAddQuestion,
  indexQuestions,
  setQuestionnaireQuestions,
  updateSections,
  addQuestionToSection,
  deleteQuestionFromSection
}) => {
  const [addNew, setAddNew] = useState(false);
  const [question, setQuestion] = useState<IQuestion>(newQuestion);
  const [isValid, setIsValid] = useState(false);
  const [sectionId, setSectionId] = useState(undefined);

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
    saveAndAddQuestion({ ...question, questionnaireId: qnId}); 
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
      setQuestionnaireQuestions(updCards);
    },
    [questions, setQuestionnaireQuestions]
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
          addQuestionToSection={moveQuestionToSection}
          prevSectionId={sectionId}
        />
      );
  };

  const moveQuestionToSection = (sectionId: string, question: IQuestion, prevSectionId: string) => {
    const updatedSections = sections.map(section => { 
      if(section.id === sectionId) { 
        return {...section, 
          questions: [...section.questions, question]
        };}
      else if(section.id === prevSectionId) {
        const updatedQuestions = section.questions.filter(q => question.id !== q.id);
        return {
          ...section,
          questions: updatedQuestions
        };
      }
      else { return section; }
    });
    updateSections(updatedSections);
    addQuestionToSection({sectionId: sectionId, questionId: question.id});
    deleteQuestionFromSection({sectionId: prevSectionId, questionId: question.id});
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.addButtonsBlock}>
        <SelectQuestionsFromExisting />
        <Button onClick={() => setAddNew(true)}>Add New</Button>
      </div>
      {addNew &&
        <Segment>
          <QuestionD onValueChange={handleOnValueChange} categories={[]} currentQuestion={question} />
          <Button floated="right" onClick={handleNewQuestionSave} color="green">Save</Button>
          <Button floated="right" onClick={handleCancel}>Cancel</Button>
        </Segment>}
        {console.log(sections)}
      {sections && sections.map(section => <SectionBlock id={section.id}>
      <UISection title={section.title} description={section.description}/>
      {section.questions.length ?
        <div>
          {/* {questions.map(q => <ResponseQuestion question={q} key={q.id} />)} */}
          {console.log(section)}
          {section.questions.map((q, i) => renderCard(q, i, section.id))}
          {/* Pass answerHandler to props if it is not preview */}
        </div>
        : <Header as='h2'>
          Urrr... Maybe nothing is modifying right now or you haven`t created any questions yet?
        </Header>}
        </SectionBlock>
      )}
      
    </div>);
};

const mapState = (state: IAppState) => ({
  qnId: state.questionnaires.current.get.id,
  questions: state.questionnaires.current.questions,
  sections: state.sections.list
});

const mapDispatch = {
  saveAndAddQuestion: addNewQuestionToQuestionnaireRoutine,
  setQuestionnaireQuestions: loadQuestionnaireQuestionsRoutine.success,
  indexQuestions: indexQuestionsRoutine,
  updateSections: updateSectionsRoutine.success,
  addQuestionToSection: addQuestionToSectionRoutine,
  deleteQuestionFromSection: deleteQuestionFromSectionRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionnairePreviewProps = ConnectedProps<typeof connector>;

export default connector(QuestionnairePreview);
