import React, {FC} from 'react';
import {Button, Form, Modal, ModalContent, ModalHeader} from "semantic-ui-react";
import {Formik} from "formik";
import * as yup from 'yup';
import styles from './styles.module.sass';
import {ICreateQuestionnaire, IQuestionnaire, IUpdateQuestionnaire} from "../../models/forms/Questionnaires/types";
import {useTranslation} from "react-i18next";

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
  };

  const [t] = useTranslation();

  return (
    <Modal open={modalShown} size="small" onClose={hideModal}>
      <ModalHeader>{modalQuestionnaire ? t('Edit questionnaire') : t('Add questionnaire')}</ModalHeader>
      {modalError && <div className={styles.modalError}>{modalError}</div>}
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
                <label>Title</label>
                <Form.Input
                  fluid
                  placeholder={t("Title")}
                  type="text"
                  name="title"
                  error={touched.title && errors.title ? errors.title : undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
              </Form.Field>
              <Button type="submit" color="teal" size="large" primary
                      loading={isLoading} disabled={isLoading}>
                {t("Save")}
              </Button>
              <Button type="button" size="large" onClick={hideModal}>
                {t("Cancel")}
              </Button>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default QuestionnaireModal;
