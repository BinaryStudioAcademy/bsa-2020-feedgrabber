import TypeToResponseMap from "models/forms/Questions/TypeToResponseMap";
import { IQuestionResponse } from "models/IQuestionResponse";
import React, { FC } from "react";
import { Header, Icon, Label, Segment } from "semantic-ui-react";

export const ResponseQuestion: FC<IQuestionResponse> = ({ question, answerHandler }) => {
    const { name, categoryTitle, type } = question;
    return (<Segment>
        <Header as='h4'>{name}</Header>
        <Label>{categoryTitle}</Label>
        {TypeToResponseMap.get(type)?.({question, answerHandler})}
    </Segment>);
};
