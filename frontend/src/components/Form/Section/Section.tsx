import React from 'react';
import {IQuestion} from 'models/forms/Questions/IQuesion';
import {Droppable} from "react-beautiful-dnd";
import QuestionCard, {ResponseQuestionProps} from 'components/Form/QuestionCard/QuestionCard';
import styles from "./styles.module.sass";
import {SectionEntity} from "../../../reducers/formEditor/reducer";
import UISection from "../../UI/UISectionCard";
import {Header} from "semantic-ui-react";
import {useTranslation} from "react-i18next";

interface ISectionProps {
    currentQuestionId: string;
    section: SectionEntity;
    questions: IQuestion[];

    renameSection(x: any): void;
}

const Section: React.FC<ISectionProps & ResponseQuestionProps> = (
    {
        section,
        setCurrentQuestion,
        questions,
        renameSection,
        currentQuestionId
    }) => {
    const handleChapterChange = (id, title, description) => renameSection({id, title, description});
    const [t] = useTranslation();

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
                        {questions?.length ? questions.map((q, i) => (
                                <QuestionCard
                                    key={q.id}
                                    index={i}
                                    setCurrentQuestion={setCurrentQuestion}
                                    question={q}
                                    isCurrent={currentQuestionId === q.id}
                                />
                            )) :
                            <Header as='h3' content={t("Add questions")}/>
                        }
                        {provided.placeholder}
                    </div>)
                }
            </Droppable>
        </>
    );
};

export default Section;
