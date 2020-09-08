import React from 'react';
import {IQuestion} from 'models/forms/Questions/IQuesion';
import {Droppable} from "react-beautiful-dnd";
import QuestionCard, {ResponseQuestionProps} from 'components/Form/QuestionCard/QuestionCard';
import styles from "./styles.module.sass";
import {ISection} from "../../../reducers/formEditor/reducer";
import UISection from "../../UI/UISectionCard";
import {Header} from "semantic-ui-react";
import {useTranslation} from "react-i18next";

interface ISectionProps {
    currentQuestion: IQuestion;
    section: ISection;
    main?: boolean;

    renameSection(x: any): void;
    deleteSection(id: string): void;
}

const Section: React.FC<ISectionProps & ResponseQuestionProps> = (
    {
        section,
        setMenuPos,
        setCurrentQuestion,
        renameSection,
        currentQuestion,
        deleteSection,
        main
    }) => {
    const handleChapterChange = (id, title, description) => renameSection({id, title, description});
    const [t] = useTranslation();
    const {id, questions} = section;
    const questionnaireId = window.location.pathname.split("/").pop();
    return (
        <>
            <UISection section={section} 
                onChanged={handleChapterChange} 
                onDelete={deleteSection} 
                questionnaireId={questionnaireId}
                main={main}/>
            <Droppable droppableId={id}>
                {provided => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={styles.wrapper}
                    >
                        {questions?.length ? questions.map((q, i) => (
                                <QuestionCard
                                    setMenuPos={setMenuPos}
                                    setCurrentQuestion={setCurrentQuestion}
                                    key={q.id}
                                    question={q}
                                    index={i}
                                    isCurrent={q.id === currentQuestion.id}
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
