import React, {FC} from "react";
import {Header} from "semantic-ui-react";
import styles from "./styles.module.sass";
import {IQuestion} from "models/forms/Questions/IQuesion";
import {DragDropContext} from "react-beautiful-dnd";
import Section from "./Section";
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

interface IFormProps {
    sections: ISection[];

    currentQuestion: IQuestion;

    indexQuestions?(questions: IIndex): void;

    updateSection?(action: {}): void;

    updateOrder?(action: {}): void;

    addQuestionToSection?(action: any): void;

    deleteQuestionFromSection?(action: any): void;
}

const Form: FC<IFormProps> = ({
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

    return (
        <DragDropContext onDragEnd={() => { return null; }}>
            <div className={styles.wrapper}>
                {sections?.map(section => section.questions?.length ?
                    <Section
                        currentQuestion={currentQuestion}
                        data={section}
                        renameSection={updateSection}
                        handleMoveQuestionToSection={moveQuestionToSection}
                        indexQuestions={indexQuestions}
                    />
                    : <Header as='h3'>
                        {t("Add questions")}
                    </Header>)
                }
            </div>
        </DragDropContext>
    );
};

export default Form;
