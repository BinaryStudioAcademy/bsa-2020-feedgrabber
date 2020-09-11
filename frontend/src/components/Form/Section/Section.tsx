import React from 'react';
import {IQuestion} from 'models/forms/Questions/IQuesion';
import {Droppable} from "react-beautiful-dnd";
import QuestionCard, {ResponseQuestionProps} from 'components/Form/QuestionCard/QuestionCard';
import styles from "./styles.module.sass";
import {SectionEntity} from "../../../reducers/formEditor/reducer";
import {Header} from "semantic-ui-react";
import {useTranslation} from "react-i18next";
import UISection from "../../UI/UISectionCard";

interface ISectionProps {
    currentQuestionId: string;
    section: SectionEntity;
    questions: IQuestion[];
    main?: boolean;

    renameSection(x: any): void;

    deleteSection(id: string): void;
}

const Section: React.FC<ISectionProps & ResponseQuestionProps> = (
    {
        section,
        setCurrentQuestion,
        questions,
        renameSection,
        deleteSection,
        main,
        currentQuestionId
    }) => {
    const handleChapterChange = (id, title, description) => renameSection({id, title, description});

    return (
        <>
            <UISection section={section} onChanged={handleChapterChange} onDelete={deleteSection} main={main}/>
            <Droppable droppableId={section.id}>
                {provided => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={styles.wrapper}
                    >
                        {questions?.map((q, i) => (
                                <QuestionCard
                                    key={q.id}
                                    index={i}
                                    setCurrentQuestion={setCurrentQuestion}
                                    question={q}
                                    isCurrent={currentQuestionId === q.id}
                                />))
                        }
                        {provided.placeholder}
                    </div>)
                }
            </Droppable>
        </>
    );
};

export default Section;
