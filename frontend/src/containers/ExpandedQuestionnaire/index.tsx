import React, {useEffect} from 'react';
import {IQuestionnaireDetails} from "./reducer";
import {loadOneQuestionnaireRoutine} from "./routines";
import {connect} from "react-redux";
import LoaderWrapper from "../../components/LoaderWrapper";

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
      {questionnaire && <div>{questionnaire.title}</div>}
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
