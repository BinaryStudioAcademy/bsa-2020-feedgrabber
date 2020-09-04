import React, { FC } from "react";
import { Header} from "semantic-ui-react";
import styles from "./styles.module.sass";
import { IQuestion } from "models/forms/Questions/IQuesion";
import UISection from "components/UI/UISectionCard";
import SectionBlock from "components/SectionBlock";
import { updateSectionsRoutine,
   addQuestionToSectionRoutine,
    deleteQuestionFromSectionRoutine,
    updateSectionRoutine } from "sagas/sections/routines";
import { connect } from "react-redux";
import SectionQuestionList from "./QuestionnaireList";
import {useTranslation} from "react-i18next";
import {ISection} from "../../reducers/formEditor/reducer";

interface IIndex  {
  // questionnaireId: string;
  sectionId: string;
  questions: IIndexObject[];
}

interface IIndexObject  {
  questionId: string;
  index: number;
}

interface IQuestionnairePreviewProps {
  sections: ISection[];
  indexQuestions(questions: IIndex): void;
  updateSections(sections: ISection[]): void;
  updateSection(action: {}): void;
  addQuestionToSection(action: any): void;
  deleteQuestionFromSection(action: any): void;
}

interface ISectionState {
  questions: IQuestion[];
}

const QuestionnairePreview: FC<IQuestionnairePreviewProps> = ({
  sections,
  indexQuestions,
  updateSections,
  updateSection,
  addQuestionToSection,
  deleteQuestionFromSection
}) => {
  const [t] = useTranslation();
  const moveQuestionToSection = (sectionId: string, question: IQuestion, prevSectionId: string) => {
    if (sectionId !== prevSectionId) {
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
    deleteQuestionFromSection({sectionId: prevSectionId, questionId: question.id});
    addQuestionToSection({sectionId: sectionId, questionId: question.id});
    }
  };

  const handleChapterChange = (id: string, title: string, description: string) => {
    updateSection({id: id, title: title, description: description});
  };

  return (
    <div className={styles.wrapper}>
      {sections && sections.map(section =>
      <SectionBlock id={section.id}>
      <UISection section={section} onChanged={handleChapterChange}/>
      {section.questions.length ?
        <SectionQuestionList
        sectionId={section.id}
        questions={section.questions}
        handleMoveQuestionToSection={moveQuestionToSection}
        indexQuestions={indexQuestions}
        />
        : <Header as='h3'>
          {t("Add questions")}
        </Header>}
        </SectionBlock>
      )}
    </div>);
};

const mapDispatch = {
  updateSections: updateSectionsRoutine.success,
  updateSection: updateSectionRoutine,
  addQuestionToSection: addQuestionToSectionRoutine,
  deleteQuestionFromSection: deleteQuestionFromSectionRoutine
};

export default connect(null, mapDispatch)(QuestionnairePreview);
