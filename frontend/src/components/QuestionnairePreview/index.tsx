import React, { FC, useState, useCallback, useEffect } from "react";
import { Header} from "semantic-ui-react";
import ResponseQuestion from "components/ResponseQuestion";
import styles from "./styles.module.sass";
import { IQuestion } from "models/forms/Questions/IQuesion";
import QuestionCard from "components/QuestionnaireOrderDraggableView/QuestionCard";
import { ISection } from "models/forms/Sections/types";
import UISection from "components/UI/UISectionCard";
import SectionBlock from "components/SectionBlock";
import { updateSectionsRoutine,
   addQuestionToSectionRoutine,
    deleteQuestionFromSectionRoutine } from "sagas/sections/routines";
import { IAppState } from "models/IAppState";
import { connect } from "react-redux";

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

interface IQuestionnairePreviewProps {
  sections: ISection[];
  questions: IQuestion[];
  qnId: string;
  indexQuestions(action: {}): void;
  updateSections(sections: ISection[]): void;
  addQuestionToSection(action: any): void;
  deleteQuestionFromSection(action: any): void;
}

interface ISectionState {
  questions: IQuestion[];
}

const QuestionnairePreview: FC<IQuestionnairePreviewProps> = ({
  qnId,
  sections,
  questions,
  indexQuestions,
  updateSections,
  addQuestionToSection,
  deleteQuestionFromSection
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
      {sections && sections.map(section => 
      <SectionBlock id={section.id}>
      <UISection title={section.title} description={section.description}/>
      {section.questions.length ?
        <div>
          {section.questions.map((q, i) => renderCard(q, i, section.id))}
        </div>
        : <Header as='h2'>
          Urrr... Maybe nothing is modifying right now or you haven`t created any questions yet?
        </Header>}
        </SectionBlock>
      )}
    </div>);
};

const mapState = (state: IAppState) => ({
  sections: state.sections.list
});

const mapDispatch = {
  updateSections: updateSectionsRoutine.success,
  addQuestionToSection: addQuestionToSectionRoutine,
  deleteQuestionFromSection: deleteQuestionFromSectionRoutine
};

export default connect(mapState, mapDispatch)(QuestionnairePreview);