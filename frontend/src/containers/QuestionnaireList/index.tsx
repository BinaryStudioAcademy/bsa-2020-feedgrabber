import React from 'react';
import {
  addQuestionnaireRoutine,
  deleteQuestionnaireRoutine,
  hideModalQuestionnaireRoutine,
  loadQuestionnairesRoutine, setQuestionnairePaginationRoutine,
  showModalQuestionnaireRoutine, updateQuestionnaireRoutine
} from "../../sagas/qustionnaires/routines";
import {IAppState} from "../../models/IAppState";
import {connect} from "react-redux";
import QuestionnaireModal from "./questionnaireModal";
import GenericPagination from "../../components/GenericPagination";
import PaginationListItem from "../../components/GenericPagination/listItem";
import {IPaginationInfo} from "../../models/IPaginationInfo";
import {history} from '../../helpers/history.helper';
import {clearOneQuestionnaireRoutine} from "../../sagas/expandedQuestionnaire/routines";
import {ICreateQuestionnaire, IQuestionnaire, IUpdateQuestionnaire} from "../../models/forms/Questionnaires/types";

interface IQuestionnaireListProps {
  pagination?: IPaginationInfo<IQuestionnaire>;
  modalQuestionnaire?: IQuestionnaire;
  isLoading: boolean;
  modalLoading: boolean;
  modalShown: boolean;
  modalError: string;

  loadQuestionnaires(): void;
  deleteQuestionnaire(id: string): void;
  addQuestionnaire(questionnaire: ICreateQuestionnaire): void;
  updateQuestionnaire(questionnaire: IUpdateQuestionnaire): void;
  showModal(questionnaire?: IQuestionnaire): void;
  hideModal(): void;
  setPagination(pagination: IPaginationInfo<IQuestionnaire>): void;
  clearOneQuestionnaire(): void;
}

const QuestionnaireList: React.FC<IQuestionnaireListProps> = (
  {
    pagination,
    modalQuestionnaire,
    modalShown,
    isLoading,
    modalLoading,
    modalError,
    loadQuestionnaires,
    deleteQuestionnaire,
    addQuestionnaire,
    updateQuestionnaire,
    showModal,
    hideModal,
    setPagination,
    clearOneQuestionnaire
  }
) => {
  const mapItemToJSX = (item: IQuestionnaire) => (
    <PaginationListItem
      key={item.id}
      title={item.title}
      description={item.companyName}
      actions={[
        {icon: 'plus', callback: () => {
            history.push(`/questionnaires/${item.id}/new-request`);
          }
        },
        {
          icon: 'settings', callback: () => {
            clearOneQuestionnaire();
            history.push(`/questionnaires/${item.id}`);
          }
        },
        {icon: 'edit', callback: () => showModal(item)},
        {icon: 'trash', callback: () => deleteQuestionnaire(item.id)}
      ]}
    />
  );

  return (
    <>
      <QuestionnaireModal
        modalShown={modalShown}
        hideModal={hideModal}
        modalQuestionnaire={modalQuestionnaire}
        isLoading={modalLoading}
        addQuestionnaire={addQuestionnaire}
        updateQuestionnaire={updateQuestionnaire}
        modalError={modalError}
      />
      <GenericPagination
        title="Questionnaires"
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        loadItems={loadQuestionnaires}
        mapItemToJSX={mapItemToJSX}
        buttons={[{text: "Add New", callback: () => showModal(undefined)}]}
      />
    </>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  pagination: rootState.questionnaires.list.pagination,
  modalShown: rootState.questionnaires.list.modalShown,
  modalQuestionnaire: rootState.questionnaires.list.modalQuestionnaire,
  isLoading: rootState.questionnaires.list.isLoading,
  modalLoading: rootState.questionnaires.list.modalLoading,
  modalError: rootState.questionnaires.list.modalError
});

const mapDispatchToProps = {
  loadQuestionnaires: loadQuestionnairesRoutine,
  deleteQuestionnaire: deleteQuestionnaireRoutine,
  addQuestionnaire: addQuestionnaireRoutine,
  updateQuestionnaire: updateQuestionnaireRoutine,
  showModal: showModalQuestionnaireRoutine,
  hideModal: hideModalQuestionnaireRoutine,
  setPagination: setQuestionnairePaginationRoutine,
  clearOneQuestionnaire: clearOneQuestionnaireRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireList);
