import React from 'react';
import {ICreateQuestionnaire, IQuestionnaire, IUpdateQuestionnaire} from "./reducer";
import {Button, Form, Modal, ModalContent, ModalHeader} from "semantic-ui-react";
import {Formik} from "formik";
import * as yup from 'yup';
import styles from './styles.module.sass';

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

const QuestionnaireModal: React.FC<IQuestionnaireModalProps> = (
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
  // to do companies select field, now - hardcoded companyId from seed.sql
  const onSubmit = values => {
    modalQuestionnaire
      ? updateQuestionnaire({
        id: modalQuestionnaire.id,
        title: values.title,
        companyId: '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'
      })
      : addQuestionnaire({
        title: values.title,
        companyId: '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'
      });
  };

  return (
    <Modal open={modalShown} size="small" onClose={hideModal}>
      <ModalHeader>{modalQuestionnaire ? 'Edit questionnaire' : 'Add questionnaire'}</ModalHeader>
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
                  placeholder="Title"
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
                Save
              </Button>
              <Button type="button" size="large" onClick={hideModal}>
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default QuestionnaireModal;
