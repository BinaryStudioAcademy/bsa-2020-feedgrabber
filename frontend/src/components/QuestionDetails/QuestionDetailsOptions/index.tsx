import {QuestionType} from "../../../models/forms/Questions/IQuesion";
import {Form, Icon} from "semantic-ui-react";
import React from "react";
import styles from "../styles.module.sass";

const questionTypeOptions = [
    {
        key: "Radio",
        text: <span className={styles.option}><Icon name="dot circle outline"/>Radio</span>,
        value: QuestionType.radio
    },
    {
        key: "CheckBoxes",
        text: <span className={styles.option}><Icon name="check square" />CheckBoxes</span>,
        value: QuestionType.checkbox
    },
    // {
    //     key: "Multichoice",
    //     text: <span className={styles.option}><Icon name="check square outline" />Multichoice</span>,
    //     value: QuestionType.multichoice
    // },
    {
        key: "TextArea",
        text: <span className={styles.option}><Icon name="align left" />TextArea</span>, // bars, content
        value: QuestionType.freeText
    },
    {
        key: "Scaled",
        text: <span className={styles.option}><Icon name="ellipsis horizontal" />Scaled</span>,
        value: QuestionType.scale
    },
    {
        key: "Date",
        text: <span className={styles.option}><Icon name="calendar alternate outline"/>Date</span>,
        value: QuestionType.date
    },
    {
        key: "fileUpload",
        text: <span className={styles.option}><Icon name="cloud upload"/>File upload</span>,
        value: QuestionType.fileUpload
    }
];

const QuestionDetailsOptions = ({ question, setQuestionType }) => {
    return (
        <Form.Dropdown
            className={styles.question_details_dropdown}
            inline
            selection
            options={questionTypeOptions}
            value={question.type}
            placeholder={"Choose type"}
            onChange={(event, data) => setQuestionType(data)}
        />
    );
};

export default QuestionDetailsOptions;
