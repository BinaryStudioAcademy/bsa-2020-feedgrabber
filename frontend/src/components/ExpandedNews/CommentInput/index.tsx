import React from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {useTranslation} from "react-i18next";
import UIButton from "../../UI/UIButton";
import styles from "./styles.module.sass";

const CommentInput = ({ value, onChange, onSubmit }) => {
    const [t] = useTranslation();

    return (
        <div className={styles.commentInput}>
            <TextareaAutosize
                className={styles.textInput}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={t("Leave comment")}
                minRows={3}
                maxRows={8}
            />
            <span className={styles.sendCommentButton}>
                <UIButton secondary title={t("Cancel")} onClick={() => onChange("")} />
                <UIButton primary title={t("Send")} onClick={onSubmit} />
            </span>
        </div>
    );
};

export default CommentInput;
