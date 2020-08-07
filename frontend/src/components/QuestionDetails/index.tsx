import React, { useState, useEffect } from 'react'; 
import styles from './styles.module.sass';
import { getData } from "../../screens/Home/services/home.service";
import { useHistory } from 'react-router-dom';

interface IQuestion {
    id: string;
    header: string;
    descripion: string;
    author: string;
    type: string;
  }

  interface IQuestionProps {
    id: string;
  }
  
  const QuestionDetails: React.FC<IQuestionProps> = ({ id }) => {
    const [question, setQuestion] = useState(undefined);
    const history = useHistory();
    const [type, setType] = useState(undefined);

    useEffect(() => {
      getQuestion(id);
    });

    const getQuestion = async(id: string) => {
      const questions: IQuestion[] = await getData();  
      const question = questions.find(question => question.id === id);
      setQuestion(question);
      setType(question.type);
      return 0;
    };

    const onClose = () => {
      history.push('/questions');
    };

    const handleChange = event => {
        setType(event.target.value);
    };

    const getForm = () => {
      switch (type) {
        case "inner-field":
          return (""); // <InnerField />;  
        case "radio-button":
          return (""); // <RadioButton />;
        case "drop-down":
          return (""); // <DropDown />;
        default:
          return ("");
      }
    };

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Question</h1> 
          <div className={styles.questionContainer}> 
            <div>
            <div className={styles.questionForm}>{ getForm() }</div>
              <select value={type} onChange={e => handleChange(e)}>
                <option value="inner-field">Inner fields</option>
                <option value="radio-button">Radio button</option>
                <option value="drop-down">Drop down list</option>
              </select>
            </div>
            <div className={styles.centerContent}>
              <button className={styles.centerContent} onClick={() => onClose()}>Close</button>
            </div>
          </div> 
        </div> 
      </div>
    );
  };

  export default QuestionDetails;
  