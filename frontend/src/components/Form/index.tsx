import React, {FC} from "react";
import styles from "./Section/styles.module.sass";
import {DragDropContext} from "react-beautiful-dnd";
import {IFormEditorState, QuestionEntity, SectionEntity} from "../../reducers/formEditor/reducer";
import {arrayMove, deleteAtIndex, insertAtIndex} from "../../helpers/array.helper";
import {ResponseQuestionProps} from "./QuestionCard/QuestionCard";
import {getById} from "../../helpers/formEditor.helper";
import Section from "./Section/Section";

interface IFormProps {
    sections: IFormEditorState['sections'];
    questions: IFormEditorState['questions'];
    updateSection(payload: any): void;
    updateOrder: any;
    updateOrderApi: any;
    deleteSection(id: string): void;
}

const Form: FC<IFormProps & ResponseQuestionProps> = (
    {
        sections,
        questions,
        updateOrder,
        updateOrderApi,
        setCurrentQuestion,
        updateSection,
        deleteSection
    }) => {

    function onDragEnd(res) {
        const {destination, source, draggableId} = res;

        // return if nothing changed
        if (!destination || (
            source.droppableId === destination.droppableId &&
            source.index === destination.index)
        ) return;

        //  get start and end sections
        const startSection = getById<SectionEntity>(source.droppableId, sections);
        const endSection = getById<SectionEntity>(destination.droppableId, sections);

        //  change state depending on where new card was placed
        if (startSection === endSection) {
            updateOrder({
                sectionId: startSection.id,
                questions: arrayMove(startSection.questions, source.index, destination.index)
            });
        } else {
            updateOrder({
                sectionId: startSection.id,
                questions: deleteAtIndex(startSection.questions, source.index)
            });
            updateOrder({
                sectionId: endSection.id,
                questions: insertAtIndex(endSection.questions, destination.index, draggableId),
                questionId: draggableId
            });
        }
        updateOrderApi({
            oldIndex: source.index,
            newIndex: destination.index,
            oldSection: source.droppableId,
            newSection: destination.droppableId
        });
    }

    const parsedSections = sections.ids
        .map(id => getById<SectionEntity>(id, sections))
        .map(s => ({
            section: s,
            questions: s.questions.map(id => getById<QuestionEntity>(id, questions).question)
        }));

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.wrapper}>
                {parsedSections.map((p, i) =>
                    <Section
                        key={p.section.id}
                        setCurrentQuestion={setCurrentQuestion}
                        currentQuestionId={questions.currentId}
                        section={p.section}
                        questions={p.questions}
                        renameSection={updateSection}
                        deleteSection={deleteSection}
                        main={i === 0}
                    />)
                }
            </div>
        </DragDropContext>
    );
};

export default Form;

