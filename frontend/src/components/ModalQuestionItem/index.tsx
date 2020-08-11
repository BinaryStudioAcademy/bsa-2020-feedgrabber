import { IQuestionBase } from "models/forms/Questions/types";
import { Card, Dimmer, Loader, Button, Segment, Header, Icon } from 'semantic-ui-react';
import styles from './styles.module.sass';
import React, { FC } from "react";

export const ModalQuestionItem: FC<IQuestionBase & { handleClick: (id: string) => void }> = (question, handleClick) => {
    return (<div key={question.id} className={styles.questionContainer}>
        <Card className={styles.question}
            link centered fluid
            onClick={() => handleClick(question.id)}>
            <Card.Content className={styles.content}>
                <Card.Meta>{question.categoryTitle}</Card.Meta>
                <Card.Description>{question.text}</Card.Description>
                <Card.Meta className={styles.right}><span>{question.type}</span></Card.Meta>
            </Card.Content>
        </Card>
    </div>);
};