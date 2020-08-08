import React, { useState, useEffect } from "react";
import styles from "./styles.module.sass";
import { useHistory } from "react-router-dom";

interface IQuestion {
  id: string;
  name: string;
  categoryId: string;
  type: string;
}

interface IQuestionProps {
  saveQuestion(question: IQuestion): void;
  match: {
    param: {
      id: string;
    };
  };
}

const QuestionDetails: React.FC<IQuestionProps> = ({ match, saveQuestion }) => {
  const [question, setQuestion] = useState(undefined);
  const [type, setType] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    getQuestion(match.param.id);
  });

  const getQuestion = async (id: string) => {
    const questions: IQuestion[] = getQuestions();
    const question = questions.find(question => question.id === id);
    setQuestion(question);
    setType(question.type);
    return 0;
  };

  const onClose = () => {
    history.push("/questions");
  };

  const onSubmit = () => {
    saveQuestion(question);
    history.push("/questions");
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const getForm = () => {
    switch (type) {
      case "input-field":
        return ""; // <InputField />;
      case "radio-button":
        return ""; // <RadioButton />;
      case "drop-down":
        return ""; // <DropDown />;
      case "checkbox":
        return ""; // <CheckBox />;
      case "scale":
        return ""; // <Scale />
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.questionContainer}>
          <div className={styles.questionForm}>{getForm()}</div>
          <select value={type} onChange={handleChange}>
            <option value="inner-field">Inner fields</option>
            <option value="radio-button">Radio button</option>
            <option value="drop-down">Drop down list</option>
          </select>
          <div className={styles.centerContent}>
            <button className={styles.closeButton} onClick={() => onClose()}>
              Close
            </button>
            <button className={styles.submitButton} onClick={() => onSubmit()}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;

const getQuestions = () => {
  return [
    {
      id: "1",
      categoryId: "Soft skills",
      name:
        "Can you tell me about a time when you successfully led a team through a sticky situation?",
      type: "input-field"
    },
    {
      id: "2",
      categoryId: "Leadership",
      name: "Are you able to delegate responsibilities efficiently?",
      type: "input-field"
    }
  ];
};
