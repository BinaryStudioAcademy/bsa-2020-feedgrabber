import { IAppState } from 'models/IAppState';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Grid, Header, Message } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { IQuestionnaire } from '../../models/IQuestionnaire';
import {
  createQuestionnaireRoutine,
  deleteQuestionnaireRoutine,
  editQuestionnaireRoutine,
  getAllQuestionnaireByCompanyRoutine,
  getAllQuestionnaireRoutine,
  getQuestionnaireRoutine
} from './routines';

interface IQuestionnaireListProps {
  goToQuestionnaire(id: string): void;
}

const QuestionnaireList: React.FC<QuestionnaireListProps & IQuestionnaireListProps> =
  ({ questionnaireList, goToQuestionnaire, getAll, isLoading }) => {

    useEffect(() => {
      getAll();
    }, [getAll]);

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Questionnaires</h1>
          <ul className={styles.questionnairesContainer}>
            {questionnaireList.map(item => (
              <li key={item.id}>
                <div>
                  {<h3>{item.title}</h3>}
                </div>
                <div className={styles.centerContent}>
                  <button className={styles.centerContent} onClick={() => goToQuestionnaire(item.id)}>Answer</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

const mapState = (state: IAppState) => ({
  questionnaireList: state.forms.questionnaires,
  isLoading: state.forms.isLoading
});

const mapDispatch = {
  create: createQuestionnaireRoutine,
  update: editQuestionnaireRoutine,
  getOne: getQuestionnaireRoutine,
  getAll: getAllQuestionnaireRoutine,
  getAllByCompany: getAllQuestionnaireByCompanyRoutine,
  delete: deleteQuestionnaireRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionnaireListProps = ConnectedProps<typeof connector>;

export default connector(QuestionnaireList);
