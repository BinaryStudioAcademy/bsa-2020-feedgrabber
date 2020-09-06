import React from 'react';
import {IQuestion} from 'models/forms/Questions/IQuesion';
import {Droppable} from "react-beautiful-dnd";
import QuestionCard from 'components/Form/QuestionCard/QuestionCard';
import styles from "./styles.module.sass";
import {ISection} from "../../../reducers/formEditor/reducer";
import UISection from "../../UI/UISectionCard";

interface ISectionProps {
    currentQuestion: IQuestion;
    section: ISection;
    renameSection(x: any): void;
}

const Section: React.FC<ISectionProps> = ({
                                              section,
                                              renameSection,
                                              currentQuestion
                                          }) => {
    const handleChapterChange = (id, title, description) => renameSection({id, title, description});

    return (
        <>
            <UISection section={section} onChanged={handleChapterChange}/>
            <Droppable droppableId={section.id}>
                {provided => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={styles.wrapper}
                    >
                        {section.questions.map((q, i) => (
                            <QuestionCard
                                key={q.id}
                                question={q}
                                index={i}
                                isCurrent={q === currentQuestion}
                            />
                        ))}
                        {provided.placeholder}
                    </div>)
                }
            </Droppable>
        </>
    );
};

export default Section;
