import React from 'react';
import {ICreateQuestionnaire, IQuestionnaire, IUpdateQuestionnaire} from "./reducer";
import {
  addQuestionnaireRoutine,
  deleteQuestionnaireRoutine,
  hideModalQuestionnaireRoutine,
  loadQuestionnairesRoutine, setQuestionnairePaginationRoutine,
  showModalQuestionnaireRoutine, updateQuestionnaireRoutine
} from "./routines";
import {connect} from "react-redux";
import QuestionnaireModal from "./questionnaireModal";
import GenericPagination from "../../components/GenericPagination";
import GenericListItem from "../../components/GenericPagination/genericListItem";
import {IPaginationInfo} from "../../models/IPaginationInfo";

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
    setPagination
  }
) => {
  const mapItemToJSX = (item: IQuestionnaire) => (
    <GenericListItem
      id={item.id}
      title={item.title}
      description={item.companyName}
      actions={[
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
  )
    ;
};

const mapStateToProps = rootState => ({
  pagination: rootState.questionnaires.pagination,
  modalShown: rootState.questionnaires.modalShown,
  modalQuestionnaire: rootState.questionnaires.modalQuestionnaire,
  isLoading: rootState.questionnaires.isLoading,
  modalLoading: rootState.questionnaires.modalLoading,
  modalError: rootState.questionnaires.modalError
});

const mapDispatchToProps = {
  loadQuestionnaires: loadQuestionnairesRoutine,
  deleteQuestionnaire: deleteQuestionnaireRoutine,
  addQuestionnaire: addQuestionnaireRoutine,
  updateQuestionnaire: updateQuestionnaireRoutine,
  showModal: showModalQuestionnaireRoutine,
  hideModal: hideModalQuestionnaireRoutine,
  setPagination: setQuestionnairePaginationRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireList);
