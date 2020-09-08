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
            text: <span className={styles.option}><Icon name="dot circle outline"/>{t("Radio")}</span>,
            value: QuestionType.radio
        },
        {
            key: "CheckBoxes",
            text: <span className={styles.option}><Icon name="check square" />{t("CheckBoxes")}</span>,
            value: QuestionType.checkbox
        },
        // {
        //     key: "Multichoice",
        //     text: <span className={styles.option}><Icon name="check square outline" />Multichoice</span>,
        //     value: QuestionType.multichoice
        // },
        {
            key: "TextArea",
            text: <span className={styles.option}><Icon name="align left" />{t("TextArea")}</span>, // bars, content
            value: QuestionType.freeText
        },
        {
            key: "Scaled",
            text: <span className={styles.option}><Icon name="ellipsis horizontal" />{t("Scaled")}</span>,
            value: QuestionType.scale
        },
        {
            key: "Date",
            text: <span className={styles.option}><Icon name="calendar alternate outline"/>{t("Date")}</span>,
            value: QuestionType.date
        },
        {
            key: "fileUpload",
            text: <span className={styles.option}><Icon name="cloud upload"/>{t("File upload")}</span>,
            value: QuestionType.fileUpload
        }
    ];

    return (
        <Form.Dropdown
            className={styles.question_details_dropdown}
            inline
            selection
            options={questionTypeOptions}
            value={question.type}
            placeholder={t("Choose type")}
            onChange={(event, data) => setQuestionType(data)}
        />
    );
};

export default QuestionDetailsOptions;
