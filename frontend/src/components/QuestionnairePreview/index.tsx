import React, {FC} from "react";
import {Header} from "semantic-ui-react";
import styles from "./styles.module.sass";
import {IQuestion} from "models/forms/Questions/IQuesion";
import UISection from "components/UI/UISectionCard";
import SectionBlock from "components/SectionBlock";
import {connect} from "react-redux";
import SectionQuestionList from "./QuestionnaireList";
import {useTranslation} from "react-i18next";
import {ISection} from "../../reducers/formEditor/reducer";

interface IIndex {
    // questionnaireId: string;
    sectionId: string;
    questions: IIndexObject[];
}

interface IIndexObject {
    questionId: string;
    index: number;
}

interface IQuestionnairePreviewProps {
    sections: ISection[];

    indexQuestions(questions: IIndex): void;

    updateSection(action: {}): void;

    addQuestionToSection(action: any): void;

    deleteQuestionFromSection(action: any): void;
}

const QuestionnairePreview: FC<IQuestionnairePreviewProps> = ({
                                                                  sections,
                                                                  indexQuestions,
                                                                  updateSection,
                                                                  addQuestionToSection,
                                                                  deleteQuestionFromSection
                                                              }) => {
    const [t] = useTranslation();
    const moveQuestionToSection = (sectionId: string, question: IQuestion, prevSectionId: string) => {
        deleteQuestionFromSection({sectionId: prevSectionId, questionId: question.id});
        // TODO add saga for editing existing question to section
        addQuestionToSection({sectionId: sectionId, questionId: question.id});
    };

    const handleChapterChange = (id: string, title: string, description: string) => {
        updateSection({id, title, description});
    };

    return (
        <div className={styles.wrapper}>
            {sections && sections.map(section =>
                <SectionBlock id={section.id}>
                    <UISection section={section} onChanged={handleChapterChange}/>
                    {section.questions.length ?
                        <SectionQuestionList
                            sectionId={section.id}
                            questions={section.questions}
                            handleMoveQuestionToSection={moveQuestionToSection}
                            indexQuestions={indexQuestions}
                        />
                        : <Header as='h3'>
                            {t("Add questions")}
                        </Header>}
                </SectionBlock>
            )}
        </div>);
};

const mapDispatch = {};

export default connect(null, mapDispatch)(QuestionnairePreview);
