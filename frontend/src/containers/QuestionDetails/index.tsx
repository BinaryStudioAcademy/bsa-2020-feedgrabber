import React, { useState, useEffect } from "react";
import styles from "./styles.module.sass";
import { useHistory } from "react-router-dom";

// ------------Mock-----------------//
enum QuestionType {
  freeText = "free_text",
  radio = "radio",
  scale = "scale",
  checkbox = " checkbox",
  inputField = "input_field",
  dropDown = "drop-down",
}

const getQuestions = (): IQuestion[] => {
  return [
    {
      id: "1",
      categoryId: "Soft skills",
      name:
        "Can you tell me about a time when you successfully led a team through a sticky situation?",
      type: QuestionType.freeText
    },
    {
      id: "2",
      categoryId: "Leadership",
      name: "Are you able to delegate responsibilities efficiently?",
      type: QuestionType.freeText
    }
  ];
};

interface IQuestion {
  id: string;
  name: string;
  categoryId: string;
  type: QuestionType;
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
  const [question, setQuestion] = useState({
    id: "",
    name: "",
    categoryId: "",
    type: QuestionType.inputField
  });
  const history = useHistory();

  useEffect(() => {
    getQuestion(match.param.id);
  });

  const getQuestion = async (id: string) => {
    const questions: IQuestion[] = getQuestions();
    const question = questions.find(question => question.id === id);
    setQuestion(question);
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
    question.type = QuestionType[event.target.value];
    setQuestion(question);
  };

  const getForm = question => {
    switch (question.type) {
      case QuestionType.inputField:
        return ""; // <InputField />;
      case QuestionType.radio:
        return ""; // <RadioButton />;
      case QuestionType.dropDown:
        return ""; // <DropDown />;
      case QuestionType.checkbox:
        return ""; // <CheckBox />;
      case QuestionType.scale:
        return ""; // <Scale />
      case QuestionType.freeText:
        return ""; // <FreeText/>
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.questionContainer}>
          <div className={styles.questionForm}>{getForm(question)}</div>
          <select value={question.type} onChange={handleChange}>
            <option value={QuestionType.inputField}>Input field</option>
            <option value={QuestionType.checkbox}>Checkbox</option>
            <option value={QuestionType.freeText}>Free text</option>
            <option value={QuestionType.dropDown}>Drop-down list</option>
            <option value={QuestionType.scale}>Scale</option>
            <option value={QuestionType.radio}>Radio buttons</option>
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
