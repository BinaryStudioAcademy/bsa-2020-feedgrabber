import {QuestionType} from "../../../models/forms/Questions/IQuesion";
import {Form, Icon} from "semantic-ui-react";
import React from "react";
import styles from "../styles.module.sass";
import {useTranslation} from "react-i18next";

const QuestionDetailsOptions = ({ question, setQuestionType }) => {
    const [t] = useTranslation();

    const questionTypeOptions = [
        {
            key: "Radio",
            text: <span className={styles.option}><Icon color="grey" name="dot circle outline"/>{t("Radio")}</span>,
            value: QuestionType.radio
        },
        {
            key: "CheckBoxes",
            text: <span className={styles.option}><Icon color="grey" name="check square" />{t("CheckBoxes")}</span>,
            value: QuestionType.checkbox
        },
        {
            key: "TextArea",
            text: <span className={styles.option}><Icon color="grey" name="align left" />{t("TextArea")}</span>,
            value: QuestionType.freeText
        },
        {
            key: "Scaled",
            text: <span className={styles.option}><Icon color="grey" name="ellipsis horizontal" />{t("Scaled")}</span>,
            value: QuestionType.scale
        },
        {
            key: "Date",
        text: <span className={styles.option}><Icon color="grey" name="calendar alternate outline"/>{t("Date")}</span>,
            value: QuestionType.date
        },
        {
            key: "fileUpload",
            text: <span className={styles.option}><Icon name="cloud upload" color="grey"/>{t("File upload")}</span>,
            value: QuestionType.fileUpload
        }
    ];

    return (
        <Form.Dropdown
            selection
            options={questionTypeOptions}
            value={question.type}
            onChange={(event, data) => setQuestionType(data)}
        />
    );
};

export default QuestionDetailsOptions;
