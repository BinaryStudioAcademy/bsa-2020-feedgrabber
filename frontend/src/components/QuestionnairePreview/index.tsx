import React, {FC} from "react";
import {Header} from "semantic-ui-react";
import styles from "./styles.module.sass";
import {IQuestion} from "models/forms/Questions/IQuesion";
import UISection from "components/UI/UISectionCard";
import SectionBlock from "components/SectionBlock";
import SectionQuestionList from "./SectionQuestionList";
import {useTranslation} from "react-i18next";
import {ISection} from "../../reducers/formEditor/reducer";

interface IIndex {
    // questionnaireId: string;
    sectionId: string;
    questions: IIndexObject[];
}

interface IIndexObject {
    questionId: string;
    index: number;
}

interface IQuestionnairePreviewProps {
    sections: ISection[];

    currentQuestion: IQuestion;

    indexQuestions?(questions: IIndex): void;

    updateSection?(action: {}): void;

    updateOrder?(action: {}): void;

    addQuestionToSection?(action: any): void;

    deleteQuestionFromSection?(action: any): void;
}

const QuestionnairePreview: FC<IQuestionnairePreviewProps> = ({
                                                                  sections,
                                                                  indexQuestions,
                                                                  updateOrder,
                                                                  currentQuestion,
                                                                  updateSection,
                                                                  addQuestionToSection,
                                                                  deleteQuestionFromSection
                                                              }) => {
    const [t] = useTranslation();
    const moveQuestionToSection = (sectionId: string, question: IQuestion, prevSectionId: string, index: number) => {
        deleteQuestionFromSection({sectionId: prevSectionId, questionId: question.id});
        addQuestionToSection({sectionId: sectionId, index, questionId: question.id});

        // moveQuestionToSectionAction({sectionId: sectionId, prevSectionId, questionId: question.id, index});

    };

    const handleChapterChange = (id: string, title: string, description: string) => {
        updateSection({id, title, description});
    };

    return (
        <div className={styles.wrapper}>
            {sections && sections.map(section =>
                <SectionBlock id={section.id} key={section.id}>
                    <UISection section={section} onChanged={handleChapterChange}/>
                    {section.questions?.length ?
                        <SectionQuestionList
                            currentQuestion={currentQuestion}
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

export default QuestionnairePreview;
