import React, {FC, useState} from 'react';
import {
    deleteQuestionnaireRoutine,
    hideModalQuestionnaireRoutine,
    loadQuestionnairesRoutine,
    saveAndGetQuestionnaireRoutine,
    loadArchivedQuestionnairesRoutine,
    setQuestionnaireArchivePaginationRoutine,
    setQuestionnairePaginationRoutine,
    showModalQuestionnaireRoutine,
    updateQuestionnaireRoutine
} from "../../sagas/qustionnaires/routines";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import QuestionnaireModal from "./questionnaireModal";
import GenericPagination from "../../components/helpers/GenericPagination";
import {history} from '../../helpers/history.helper';
import {IQuestionnaire} from "../../models/forms/Questionnaires/types";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import UIButton from "../../components/UI/UIButton";
import {Icon, Modal, ModalContent, Popup} from "semantic-ui-react";
import styles from './styles.module.sass';
import {useTranslation} from "react-i18next";

const QuestionnaireList: FC<Props> = (
    {
        pagination,
        archivePagination,
        modalQuestionnaire,
        modalShown,
        isLoading,
        modalLoading,
        modalError,
        loadQuestionnaires,
        loadArchivedQuestionnaires,
        deleteQuestionnaire,
        addQuestionnaire,
        updateQuestionnaire,
        showModal,
        hideModal,
        setPagination,
        result,
        isArchiveLoading,
        setArchivePagination
    }
) => {
    const [t] = useTranslation();
    const [showArchived, setShowArchived] = useState(false);
    const mapItemToJSX = (item: IQuestionnaire) => {
        const match = result
            .questionnaires
            .map(q => q.id)
            .includes(item.id);
        return <UICard key={item.id}>
            <UICardBlock className={`${styles.cardBlockWrapper} ${match && styles.searched}`}>
                <h3>{item.title}</h3>
                <span
                    style={
                        {
                            fontSize: '0.8rem',
                            display: 'inline-flex',
                            alignItems: 'center'
                        }
                    }>{match && 'Matches searched query!'}</span>
                {!showArchived
                    ? <div className={styles.cardIconWrapper}>
                      <Popup
                        content={t("New request")}
                        position="top center"
                        trigger={
                          <Icon
                            name="share alternate"
                            onClick={() => history.push(`/questionnaires/${item.id}/new-request`)}
                            className={styles.cardIcon}
                          />
                        }
                      />
                      <Popup
                        content={t("Manage questions")}
                        position="top center"
                        trigger={
                          <Icon
                            name="settings"
                            onClick={() => {
                              history.push(`/questionnaires/${item.id}`);
                            }}
                            className={styles.cardIcon}
                          />
                        }
                      />
                      <Popup
                          content={t("Show requests and reports")}
                          position="top center"
                          trigger={
                              <Icon
                                  name="chart bar"
                                  onClick={() => {
                                      history.push(`/questionnaires/${item.id}/requests`);
                                  }}
                                  className={styles.cardIcon}
                              />
                          }
                      />
                      <Popup
                        content={t("Change title")}
                        position="top center"
                        trigger={
                          <Icon
                            name="edit"
                            onClick={() => showModal(item)}
                            className={styles.cardIcon}
                          />
                        }
                      />
                      <Popup
                          content={t("Archive")}
                          position="top center"
                          trigger={
                              <Icon
                                  name="archive"
                                  onClick={() => updateQuestionnaire({...item, archived: true})}
                                  className={styles.cardIcon}
                              />
                          }
                      />
                    </div>
                    : <div className={styles.cardIconWrapper}>
                        <Popup
                            content={t("Show requests and reports")}
                            position="top center"
                            trigger={
                                <Icon
                                    name="chart bar"
                                    onClick={() => {
                                        history.push(`/questionnaires/${item.id}/requests`);
                                    }}
                                    className={styles.cardIcon}
                                />
                            }
                        />
                        <Popup
                            content={t("Unarchive")}
                            position="top center"
                            trigger={
                                <Icon
                                    name="undo"
                                    onClick={() => {
                                        updateQuestionnaire({ ...item, archived: false });
                                        loadArchivedQuestionnaires();
                                    }}
                                    className={styles.cardIcon}
                                />
                            }
                        />
                        <Popup
                            content={t("Delete questionnaire")}
                            position="top center"
                            trigger={
                                <Icon
                                    name="trash"
                                    onClick={() => deleteQuestionnaire(item.id)}
                                    className={styles.cardIcon}
                                />
                            }
                        />
                    </div>
                }
            </UICardBlock>
        </UICard>;
    };

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
            <UIPageTitle title={t("Questionnaires")}>
                <span className={styles.rightFloated}>
                        <UIButton title={t("Archived")}
                                  secondary
                                  onClick={() => setShowArchived(!showArchived)}/>
                </span>
            </UIPageTitle>
            <UIContent>
                <UIColumn wide>
                    <UIButton
                    title={t("Add Questionnaire")}
                    onClick={() => showModal(undefined)}
                    center
                    primary
                />
                    {!showArchived
                        ? <GenericPagination isLoading={isLoading} pagination={pagination} setPagination={setPagination}
                                           loadItems={loadQuestionnaires} mapItemToJSX={mapItemToJSX} />
                        :
                        <Modal
                            open={showArchived}
                            onClose={() => setShowArchived(false)}
                        >
                            <Modal.Header>{t("Archived")}</Modal.Header>
                            <ModalContent>
                                <GenericPagination
                                    isLoading={isArchiveLoading}
                                    pagination={archivePagination}
                                    setPagination={setArchivePagination}
                                    loadItems={loadArchivedQuestionnaires}
                                    mapItemToJSX={mapItemToJSX}
                                />
                            </ModalContent>
                        </Modal>
                    }
                </UIColumn>
            </UIContent>
        </>
    );
};

const mapStateToProps = (rootState: IAppState) => ({
    pagination: rootState.questionnaires.list.pagination,
    archivePagination: rootState.questionnaires.archived.pagination,
    modalShown: rootState.questionnaires.list.modalShown,
    modalQuestionnaire: rootState.questionnaires.list.modalQuestionnaire,
    isLoading: rootState.questionnaires.list.isLoading,
    isArchiveLoading: rootState.questionnaires.archived.isLoading,
    modalLoading: rootState.questionnaires.list.modalLoading,
    modalError: rootState.questionnaires.list.modalError,
    result: rootState.search.result
});

const mapDispatchToProps = {
    loadQuestionnaires: loadQuestionnairesRoutine,
    loadArchivedQuestionnaires: loadArchivedQuestionnairesRoutine,
    deleteQuestionnaire: deleteQuestionnaireRoutine,
    addQuestionnaire: saveAndGetQuestionnaireRoutine,
    updateQuestionnaire: updateQuestionnaireRoutine,
    showModal: showModalQuestionnaireRoutine,
    hideModal: hideModalQuestionnaireRoutine,
    setArchivePagination: setQuestionnaireArchivePaginationRoutine,
    setPagination: setQuestionnairePaginationRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(QuestionnaireList);
