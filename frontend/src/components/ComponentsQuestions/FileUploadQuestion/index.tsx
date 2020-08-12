import React from "react";
import QuestionField from "./QuestionField";
import {Dropdown, Label} from "semantic-ui-react";
import styles from "./styles.module.sass";
import {ErrorMessage} from "formik";

const types = ["image", "video"];

const options = types.map(option => {
    return {
        key: option,
        text: option,
        value: option
    };
});

const FileUploadQuestion: React.FC = () => {
    return (
        <div className={styles.fileUploadQuestion}>
            <div className={styles.questionField}>
                <Label className={styles.label}>Type of file</Label>
                <Dropdown
                    className={styles.inputField}
                    name="answers.fileType"
                    selection
                    placeholder="Choose file type"
                    options={options}
                />
                <div className={styles.errorMessage}>
                    <ErrorMessage name={"answers.fileType"} />
                </div>
            </div>
            <QuestionField label={"Maximum number of files"}
                           name={"answers.fileNumber"} type={"number"} inputProps={{ min: 1, max: 10 }} />
            <QuestionField label={"Maximum file size"}
                           name={"answers.fileSize"} type={"number"} inputProps={{ min: 0 }}/>
        </div>
    );
};

export default FileUploadQuestion;
