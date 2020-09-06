import React, {FC, useState} from "react";
import {Header} from "semantic-ui-react";
import styles from "./Section/styles.module.sass";
import {IQuestion} from "models/forms/Questions/IQuesion";
import {DragDropContext} from "react-beautiful-dnd";
import Section from "./Section/Section";
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
    const [data, setData] = useState<ISection[]>(sections);
    const [t] = useTranslation();

    function onDragEnd(res) {
        const {destination, source} = res;

        // return if nothing changed
        if (!destination || (
            source.droppableId === destination.droppableId &&
            source.index === destination.index)
        ) return;

        //  get start and end sections
        const startSection = data.find(s => s.id === source.droppableId);
        const endSection = data.find(s => s.id === destination.droppableId);
        const draggedItem = startSection.questions[source.index];

        //  change state depending on where new card was placed
        if (startSection === endSection) {
            const newQuestions = deleteAtIndex([...startSection.questions], source.index);

            const newSection = {
                ...startSection,
                questions: insertAtIndex(newQuestions, destination, draggedItem)
            };

            setData(data => data.map(s => s.id === newSection.id ? newSection : s));
        } else {
            //  card was dropped to origin section
            const newStartSection = {
                ...startSection,
                questions: deleteAtIndex([...startSection.questions], source.index)
            };

            const newEndSection = {
                ...endSection,
                questions: insertAtIndex([...endSection.questions], destination.index, draggedItem)
            };

            setData(data => data.map(s => (
                s.id === newStartSection.id ? newStartSection
                    : s.id === newEndSection.id ? newEndSection
                    : s
            )));
        }
    }

    const moveQuestionToSection = (sectionId: string, question: IQuestion, prevSectionId: string, index: number) => {
        deleteQuestionFromSection({sectionId: prevSectionId, questionId: question.id});
        addQuestionToSection({sectionId: sectionId, index, questionId: question.id});

        // moveQuestionToSectionAction({sectionId: sectionId, prevSectionId, questionId: question.id, index});

    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.wrapper}>
                {data?.map(section => section.questions?.length ?
                    <Section
                        key={section.id}
                        currentQuestion={currentQuestion}
                        section={section}
                        renameSection={updateSection}
                    />
                    : <Header as='h3' key={section.id}>
                        {t("Add questions")}
                    </Header>)
                }
            </div>
        </DragDropContext>
    );
};

export default Form;

function deleteAtIndex(arr: Array<IQuestion>, index: number): Array<IQuestion> {
    arr.splice(index, 1);
    return arr;
}

function insertAtIndex(arr: Array<IQuestion>, index: number, q: IQuestion): Array<IQuestion> {
    arr.splice(index, 0, q);
    return arr;
}

