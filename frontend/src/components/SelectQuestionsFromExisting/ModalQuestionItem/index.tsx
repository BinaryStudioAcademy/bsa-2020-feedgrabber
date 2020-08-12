import {Card} from 'semantic-ui-react';
import styles from './styles.module.sass';
import React, {FC} from "react";
import {IQuestion} from "../../../models/forms/Questions/IQuesion";

interface IItemProps {
    handleClick: (id: string) => void;
    question: IQuestion;
    isSelected: boolean;
}

export const ModalQuestionItem: FC<IItemProps> = ({question, handleClick, isSelected}) => {
    return (
        <div className={styles.questionContainer}>
            <Card className={styles.question}
                  link centered fluid
                  onClick={() => handleClick(question.id)}>
                <Card.Content className={styles.content}>
                    <Card.Meta>{question.categoryTitle}</Card.Meta>
                    <Card.Description>{question.name}</Card.Description>
                    <Card.Meta className={styles.right}>{question.type.toLowerCase()}</Card.Meta>
                </Card.Content>
            </Card>
        </div>);
};
