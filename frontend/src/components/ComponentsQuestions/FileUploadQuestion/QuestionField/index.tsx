import React from "react";
import {ErrorMessage, useField} from "formik";
import {Input} from "semantic-ui-react";
import styles from "../styles.module.sass";

interface IQuestionFieldProps {
    text: string;
    name: string;
    type: string;
    inputProps?: any;
    value?: number;
    onChange?: any;
}

const QuestionField: React.FC<IQuestionFieldProps> = data => {
    const [field] = useField(data?.name);
    return (
        <div className={styles.questionField}>
            <span className={styles.description}>{data.text}</span>
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
