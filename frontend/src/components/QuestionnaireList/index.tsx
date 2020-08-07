import React from 'react'; 
import { Grid, Header, Message } from 'semantic-ui-react';
import styles from './styles.module.sass';

interface IQuestionnire {
  id: string;
  header: string;
  descripion: string;
  author: string;
}

interface IQuestionnaireListProps {
  questionnaireList: IQuestionnire[];
  goToQuestionnaire(id: string): void;
}

const QuestionnaireList: React.FC<IQuestionnaireListProps> = ({ questionnaireList, goToQuestionnaire }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Questionnaires</h1>
        <ul className={styles.questionnairesContainer}>
          {questionnaireList.map(item => (
            <li key={item.id}>
              <div>
                {<h3>{item.header}</h3>}
                {<p className={styles.description}>{item.descripion}</p>}
                {<p className={styles.author}>{item.author}</p>}
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

export default QuestionnaireList;