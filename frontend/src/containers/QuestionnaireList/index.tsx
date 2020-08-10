import React, {useEffect} from 'react';
import styles from './styles.module.sass';
import {ICreateQuestionnaire, IQuestionnaire, IUpdateQuestionnaire} from "./reducer";
import {
  addQuestionnaireRoutine,
  deleteQuestionnaireRoutine,
  hideModalQuestionnaireRoutine,
  loadQuestionnairesRoutine,
  showModalQuestionnaireRoutine, updateQuestionnaireRoutine
} from "./routines";
import {connect} from "react-redux";
import {Icon} from "semantic-ui-react";
import QuestionnaireModal from "./questionnaireModal";

interface IQuestionnaireListProps {
  questionnaireList: IQuestionnaire[];
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
}

const QuestionnaireList: React.FC<IQuestionnaireListProps> = (
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
    if (!questionnaireList) {
      loadQuestionnaires();
    }
  }, [questionnaireList, loadQuestionnaires]);

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
      {isLoading
        ? <div>Loading</div>
        : (
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
        )
      }
    </>
  );
};

const mapStateToProps = rootState => ({
  questionnaireList: rootState.questionnaires.items,
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
  hideModal: hideModalQuestionnaireRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireList);
