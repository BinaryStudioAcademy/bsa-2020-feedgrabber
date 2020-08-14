import React, { useEffect } from 'react';
import { connect } from "react-redux";
import LoaderWrapper from "../../components/LoaderWrapper";
import styles from './styles.module.sass';
import QuestionnairePreview from 'components/QuestionnairePreview';
import { loadOneQuestionnaireRoutine } from 'sagas/qustionnaires/routines';
import { IQuestionnaire } from 'models/forms/Questionnaires/types';
import { IAppState } from 'models/IAppState';

interface IExpandedQuestionnaireProps {
  match: any;
  isLoading: boolean;
  questionnaire: IQuestionnaire;
  loadOneQuestionnaire(id: string): void;
}

const ExpandedQuestionnaire: React.FC<IExpandedQuestionnaireProps> = (
  {
    match,
    isLoading,
    questionnaire,
    loadOneQuestionnaire
  }
) => {
  useEffect(() => {
    loadOneQuestionnaire(match.params.id);
  }, [loadOneQuestionnaire, match.params.id]);

  return (
    <LoaderWrapper loading={isLoading}>
      {questionnaire && (
        <div>
          <h1 className={styles.questionnaireTitle}>{questionnaire.title}</h1>
          <QuestionnairePreview />
        </div>
      )}
    </LoaderWrapper>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  questionnaire: rootState.questionnaires.current.get
});

const mapDispatchToProps = {
  loadOneQuestionnaire: loadOneQuestionnaireRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpandedQuestionnaire);
