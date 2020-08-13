import React, { useEffect } from 'react';
import { IQuestionnaireDetails } from "../../reducers/expandedQuestionnaire/reducer";
import { loadOneQuestionnaireRoutine } from "../../sagas/expandedQuestionnaire/routines";
import { connect } from "react-redux";
import LoaderWrapper from "../../components/LoaderWrapper";
import styles from './styles.module.sass';
import QuestionDetails from "../QuestionDetails";
import { history } from '../../helpers/history.helper';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface IExpandedQuestionnaireProps {
  match: any;
  isLoading: boolean;
  questionnaire: IQuestionnaireDetails;

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
    if (!questionnaire && !isLoading) {
      loadOneQuestionnaire(match.params.id);
    }
  });

  return (
    <LoaderWrapper loading={isLoading}>
      {questionnaire && (
        <div>
          <h1 className={styles.questionnaireTitle}>{questionnaire.title}</h1>
          <Button
            as={Link}
            to={`${history.createHref(history.location)}/preview`}
            content='Preview'
            history={history} />
          <div className={styles.formDetails}>
            <div className={styles.formEditor}>
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
              <QuestionDetails saveQuestion={() => { }} match={{ params: {} }} history={history} />
            </div>
          </div>
        </div>
      )}
    </LoaderWrapper>
  );
};

const mapStateToProps = rootState => ({
  isLoading: rootState.expandedQuestionnaire.isLoading,
  questionnaire: rootState.expandedQuestionnaire.questionnaire
});

const mapDispatchToProps = {
  loadOneQuestionnaire: loadOneQuestionnaireRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpandedQuestionnaire);
