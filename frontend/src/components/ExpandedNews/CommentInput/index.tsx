import React from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {useTranslation} from "react-i18next";
import UIButton from "../../UI/UIButton";
import styles from "./styles.module.sass";

interface ICommentInputProps {
    className?: string;
    value: string;
    onChange(string): void;
    onSubmit(): void;
}

const CommentInput: React.FC<ICommentInputProps> = ({ className, value, onChange, onSubmit }) => {
    const [t] = useTranslation();

    return (
        <div className={className ? className : ""}>
            <TextareaAutosize
                className={styles.textInput}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={t("Leave comment")}
                minRows={3}
                maxRows={8}
            />
            <div className={styles.sendCommentButton}>
                <UIButton secondary title={t("Cancel")} onClick={() => onChange("")} />
                <UIButton primary title={t("Send")} onClick={onSubmit} />
            </div>
        </div>
    );
};

export default CommentInput;
