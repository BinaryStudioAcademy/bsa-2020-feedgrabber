import React from "react";
import {ErrorMessage, useField} from "formik";
import {Input, Label} from "semantic-ui-react";
import styles from "../styles.module.sass";

interface IQuestionFieldProps {
    label: string;
    name: string;
    type: string;
    inputProps?: any;
    value?: number;
    onChange?: any;
}

const QuestionField: React.FC<IQuestionFieldProps> = data => {
    const [field] = useField(data.name);
    return (
        <div className={styles.questionField}>
            <Label className={styles.label}>{data.label}</Label>
            <Input className={styles.inputField}
                   type={data.type} {...field} {...data.inputProps}
                   value={data.value} onChange={data.onChange}
            />
            <div className={styles.errorMessage}>
                <ErrorMessage {...field} />
            </div>
        </div>

    );
};

export default QuestionField;
