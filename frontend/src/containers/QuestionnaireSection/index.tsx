import React, { FC } from 'react';
import UIListHeader from 'components/UI/UIQuestionListHeader';

interface ISection {
    title: string;
    description?: string;
}

interface IQuestionnaireSectionProps {
    section: ISection;
}

const QuestionnaireSection: FC<IQuestionnaireSectionProps> = ({section}) => {
    return (
        <UIListHeader title={section.title} description={section.description}></UIListHeader>
    );
};

export default QuestionnaireSection;