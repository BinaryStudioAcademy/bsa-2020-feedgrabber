import React, {FC, useEffect} from 'react';
import styles from './styles.module.sass';
import {
  addQuestionnaireRoutine,
  deleteQuestionnaireRoutine,
  hideModalQuestionnaireRoutine,
  loadQuestionnairesRoutine,
  showModalQuestionnaireRoutine, updateQuestionnaireRoutine
} from "../../sagas/qustionnaires/routines";
import {connect, ConnectedProps} from "react-redux";
import {Icon} from "semantic-ui-react";
import QuestionnaireModal from "./questionnaireModal";
import {IAppState} from "../../models/IAppState";

const QuestionnaireList: FC<IQuestionnaireListProps> = (
  {
    questionnaireList,
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
    hideModal
  }
) => {
  useEffect(() => {
      loadQuestionnaires();
  }, [loadQuestionnaires]);

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
      <h1>Questionnaires</h1>
          <div className={styles.container}>
            <div className={styles.content}>
              {questionnaireList && (
                <div className={styles.questionnairesContainer}>
                  {questionnaireList.map(item => (
                    <div key={item.id} className={styles.questionnaire}>
                      <div>
                        <h3>{item.title}</h3>
                        <p className={styles.description}>{item.companyName}</p>
                      </div>
                      <div>
                        <Icon className="edit" onClick={() => showModal(item)}/>
                        <Icon className="trash" onClick={() => deleteQuestionnaire(item.id)}/>
                      </div>
                    </div>
                  ))}
                  {questionnaireList.length === 0 && <h2>No items</h2>}
                </div>
              )}
              <div className={styles.addBlock}>
                <Icon className="plus" onClick={() => showModal(undefined)}/>
              </div>
            </div>
          </div>
    </>
  );
};

const mapState = (state: IAppState) => ({
    questionnaireList: state.questionnaires.list.items,
    modalShown: state.questionnaires.list.modalShown,
    modalQuestionnaire: state.questionnaires.list.modalQuestionnaire,
    isLoading: state.questionnaires.list.isLoading,
    modalLoading: state.questionnaires.list.modalLoading,
    modalError: state.questionnaires.list.modalError
});

const mapDispatch = {
    loadQuestionnaires: loadQuestionnairesRoutine,
    deleteQuestionnaire: deleteQuestionnaireRoutine,
    addQuestionnaire: addQuestionnaireRoutine,
    updateQuestionnaire: updateQuestionnaireRoutine,
    showModal: showModalQuestionnaireRoutine,
    hideModal: hideModalQuestionnaireRoutine
};

const connector = connect(mapState, mapDispatch);

type IQuestionnaireListProps = ConnectedProps<typeof connector>;

export default connector(QuestionnaireList);
