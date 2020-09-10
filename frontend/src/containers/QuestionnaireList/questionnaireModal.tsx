import React, {FC} from 'react';
import {Form, Modal, ModalContent, ModalHeader} from "semantic-ui-react";
import {Formik} from "formik";
import * as yup from 'yup';
import styles from './styles.module.sass';
import {ICreateQuestionnaire, IQuestionnaire, IUpdateQuestionnaire} from "../../models/forms/Questionnaires/types";
import {useTranslation} from "react-i18next";
import UIButton from "../../components/UI/UIButton";

interface IQuestionnaireModalProps {
  modalQuestionnaire?: IQuestionnaire;
  modalShown: boolean;
  modalError: string;
  isLoading: boolean;

  addQuestionnaire(questionnaire: ICreateQuestionnaire): void;

  updateQuestionnaire(questionnaire: IUpdateQuestionnaire): void;

  hideModal(): void;
}

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required()
    .min(3, "Too Short! Min 3 symbols")
    .max(40, "Too Long! Max 40 symbols")
    .matches(/^\w([A-Za-zА-Яа-я\d!#$%&'*+\-/=?^_`])([ ]?[A-Za-zА-Яа-я\d!#$%&'*+\-/=?^_`])*$/,
        "Title must be valid")
});

const QuestionnaireModal: FC<IQuestionnaireModalProps> = (
  {
    modalQuestionnaire,
    modalShown,
    isLoading,
    modalError,
    addQuestionnaire,
    updateQuestionnaire,
    hideModal
  }
) => {
  const onSubmit = values => {
    modalQuestionnaire
      ? updateQuestionnaire({
        id: modalQuestionnaire.id,
        title: values.title
      })
      : addQuestionnaire({
        title: values.title
      });
    hideModal();
  };

  const [t] = useTranslation();

  return (
    <Modal open={modalShown} size="small" onClose={hideModal}>
      <ModalHeader>{modalQuestionnaire ? t('Edit questionnaire') : t('Add questionnaire')}</ModalHeader>
      {modalError && <div className={styles.modalError}>{t(modalError)}</div>}
      <ModalContent>
        <Formik
          initialValues={{title: modalQuestionnaire ? modalQuestionnaire.title : ''}}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              touched
            }) => (
            <Form name="loginForm" size="large" onSubmit={handleSubmit}>
              <Form.Field>
                <label>{t("Title")}</label>
                <Form.Input
                  fluid
                  placeholder={t("Title")}
                  type="text"
                  name="title"
                  error={touched.title && errors.title ? t(errors.title) : undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
              </Form.Field>
              <UIButton submit loading={isLoading} disabled={isLoading} title={t("Save")}/>
              <UIButton secondary onClick={hideModal} title={t("Cancel")}/>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default QuestionnaireModal;
