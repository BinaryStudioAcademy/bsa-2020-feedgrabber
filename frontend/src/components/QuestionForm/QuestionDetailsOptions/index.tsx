import {QuestionType} from "../../../models/forms/Questions/IQuesion";
import {Dropdown, Icon} from "semantic-ui-react";
import React from "react";
import styles from "../styles.module.sass";
import {useTranslation} from "react-i18next";
import styled from "styled-components";

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

    const StyledDropdown = styled(Dropdown)`
        .menu {
            // top: -100px !important;
        }
        line-height: 1.21428571em;
        padding: .67857143em 1em;
        font-size: 1em;
        background: #fff;
        border: 1px solid rgba(34,36,38,.15);
        color: rgba(0,0,0,.87);
        border-radius: .28571429rem;
        box-shadow: 0 0 0 0 transparent inset;
        transition: color .1s ease,border-color .1s ease;
        &:focus{
    `;

    return (
        <StyledDropdown
            options={questionTypeOptions}
            style={{height: 'fit-content', menu: {top: 200}}}
            value={question.type}
            onChange={(event, data) => setQuestionType(data)}
        />
    );
};

export default QuestionDetailsOptions;
