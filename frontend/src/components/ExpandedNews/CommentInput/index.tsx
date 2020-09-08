import React from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {useTranslation} from "react-i18next";
import UIButton from "../../UI/UIButton";
import styles from "./styles.module.sass";

interface ICommentInputProps {
    className?: string;
    loading?: boolean;
    value: string;
    onChange(string): void;
    onCancel(): void;
    onSubmit(): void;
}

const CommentInput: React.FC<ICommentInputProps> = ({ className, loading, value, onChange, onCancel, onSubmit }) => {
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
                <UIButton secondary title={t("Cancel")} onClick={onCancel} />
                <UIButton primary loading={loading} title={t("Send")} onClick={onSubmit} />
            </div>
        </div>
    );
};

export default CommentInput;
