import React, {FC} from "react";
import styles from "./Section/styles.module.sass";
import {IQuestion} from "models/forms/Questions/IQuesion";
import {DragDropContext} from "react-beautiful-dnd";
import Section from "./Section/Section";
import {ISection} from "../../reducers/formEditor/reducer";
import {deleteAtIndex, insertAtIndex} from "../../helpers/array.helper";
import {ResponseQuestionProps} from "./QuestionCard/QuestionCard";

interface IFormProps {
    sections: ISection[];
    currentQuestion: IQuestion;

    updateSection(action: {}): void;

    updateOrder(action: {}): void;

    updateSections(action: {}): void;
}

const Form: FC<IFormProps & ResponseQuestionProps> = (
    {
        sections,
        updateSections,
        updateOrder,
        setCurrentQuestion,
        currentQuestion,
        updateSection
    }) => {

    function onDragEnd(res) {
        const {destination, source} = res;

        // return if nothing changed
        if (!destination || (
            source.droppableId === destination.droppableId &&
            source.index === destination.index)
        ) return;

        //  get start and end sections
        const startSection = sections.find(s => s.id === source.droppableId);
        const endSection = sections.find(s => s.id === destination.droppableId);
        const draggedItem = startSection.questions[source.index];

        //  change state depending on where new card was placed
        if (startSection === endSection) {
            const newQuestions = deleteAtIndex([...startSection.questions], source.index);

            const newSection = {
                ...startSection,
                questions: insertAtIndex(newQuestions, destination.index, draggedItem)
            };

            updateSections({
               sections: sections.map(s => s.id === newSection.id ? newSection : s),
               currentSection: newSection
            });
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

            updateSections({
                sections: sections.map(s => (
                    s.id === newStartSection.id ? newStartSection
                        : s.id === newEndSection.id ? newEndSection
                        : s
                )),
                currentSection: newEndSection
            });
        }
        updateOrder({
            oldIndex: source.index,
            newIndex: destination.index,
            oldSection: source.droppableId,
            newSection: destination.droppableId
        });
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.wrapper}>
                {sections?.map(section =>
                    <Section
                        key={section.id}
                        setCurrentQuestion={setCurrentQuestion}
                        currentQuestion={currentQuestion}
                        section={section}
                        renameSection={updateSection}
                    />)
                }
            </div>
        </DragDropContext>
    );
};

export default Form;

