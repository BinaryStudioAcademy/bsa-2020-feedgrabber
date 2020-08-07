import React, { useState, useEffect } from 'react'; 
import styles from './styles.module.sass';
import { getData } from "../../screens/Home/services/home.service";
import { useHistory } from 'react-router-dom';

interface IQuestion {
    id: string;
    header: string;
    descripion: string;
    author: string;
  }

  interface IQuestionProps {
    id: string;
  }
  
  const QuestionDetails: React.FC<IQuestionProps> = ({ id }) => {
    const [q, setQ] = useState(undefined);
    const history = useHistory();

    useEffect(() => {
      getQuestion(id);
    });

    const getQuestion = async(id: string) => {
      const questions = await getData();  
      setQ(questions.find(question => question.id === id));
      return 0;
    };

    const onClose = () => {
      history.push('/questions/list');
    };

    return (
      <div className={styles.container}>
        { q ? 
        <div className={styles.content}>
          <h1>Question</h1>
          <div className={styles.questionContainer}>
            <div>
              {<h3>{q.header}</h3>}
              {<p className={styles.description}>{q.descripion}</p>}
              {<p className={styles.author}>{q.author}</p>}
            </div>
            <div className={styles.centerContent}>
              <button className={styles.centerContent} onClick={() => onClose()}>Close</button>
            </div>
          </div>
        </div> : <span>Loading...</span>}
      </div>
    );
  };

  export default QuestionDetails;