import React, {useEffect} from 'react';
import {connect} from "react-redux";
import LoaderWrapper from "../../components/LoaderWrapper";
import styles from './styles.module.sass';
import {IQuestion, QuestionType} from "../../models/forms/Questions/IQuesion";
import QuestionnaireOrderView from "../../components/QuestionnaireOrderDraggableView";
import QuestionnairePreview from 'components/QuestionnairePreview';
import {loadOneQuestionnaireRoutine} from 'sagas/qustionnaires/routines';
import {IQuestionnaire} from 'models/forms/Questionnaires/types';
import {IAppState} from 'models/IAppState';
import QuestionMenu from "../../components/QuestionMenu";
import { getSectionsByQuestionnaireRoutine } from 'sagas/sections/routines';
import { ISection } from 'models/forms/Sections/types';

const questions = [
    // {
    //     id: "1",
    //     name: "first",
    //     categoryTitle: "sdf",
    //     details: {answerOptions: []}
    // },
    // {
    //     id: "2",
    //     name: "second",
    //     categoryTitle: "sdf",
    //     details: {answerOptions: []}
    // },
    // {
    //     id: "3",
    //     name: "third",
    //     categoryTitle: "sdf",
    //     details: {answerOptions: []}
    // }
] as IQuestion[];

interface IExpandedQuestionnaireProps {
    match: any;
    isLoading: boolean;
    questionnaire: IQuestionnaire;
    sections: ISection[];

    loadOneQuestionnaire(id: string): void;
    loadSections(id: string): void;
}

const ExpandedQuestionnaire: React.FC<IExpandedQuestionnaireProps> = (
    {
        match,
        isLoading,
        questionnaire,
        sections,
        loadOneQuestionnaire,
        loadSections
    }
) => {
    useEffect(() => {
        console.log(match.params.id);
        loadOneQuestionnaire(match.params.id);
        loadSections(match.params.id);
    }, [loadOneQuestionnaire, match.params.id, loadSections]);

    return (
        <LoaderWrapper loading={isLoading}>
            {questionnaire && (
                <div className={styles.formDetails}>
                    <div className={styles.formPreview}>
                    <QuestionnairePreview/>
                    <QuestionMenu/>
                    </div>
                    {/* <QuestionnaireOrderView questions={questions} isLoading={isLoading} save={() => {}} /> */}
                </div>
            )}
            
        </LoaderWrapper>
    );
};

const mapStateToProps = (rootState: IAppState) => ({
    questionnaire: rootState.questionnaires.current.get,
    isLoading: rootState.sections.isLoading,
    sections: rootState.sections.list
});

const mapDispatchToProps = {
    loadOneQuestionnaire: loadOneQuestionnaireRoutine,
    loadSections: getSectionsByQuestionnaireRoutine
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpandedQuestionnaire);
