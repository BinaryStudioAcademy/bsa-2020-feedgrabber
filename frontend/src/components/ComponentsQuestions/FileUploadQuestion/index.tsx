import React, {useEffect} from "react";
import QuestionField from "./QuestionField";
import {Dropdown} from "semantic-ui-react";
import styles from "./styles.module.sass";
import {ErrorMessage} from "formik";
import {IGenericQuestionComponent, invalidState, useInitValue, validState} from "../IQuestionInputContract";
import {IFileUploadAnswerDetails} from "../../../models/forms/Questions/IQuesion";
import {fileTypesArray} from "./types";
import {useTranslation} from "react-i18next";

const options = fileTypesArray.map(option => {
    return {
        key: option,
        text: option,
        value: option
    };
});

const FileUploadQuestion: IGenericQuestionComponent<IFileUploadAnswerDetails> =
    ({value: propValue, onValueChange}) => {
        const [ t ] = useTranslation();

        const values = useInitValue(
            {value: {filesType: "", filesNumber: 1, filesSize: 10}, isCompleted: false},
            propValue,
            onValueChange
        );

        const check = (details: IFileUploadAnswerDetails) => {
            if(details.filesNumber<1){details.filesNumber=1;}
            if(details.filesSize<1){details.filesSize=1;}
            if(details.filesType){
                onValueChange(validState(details));
            }else{
                onValueChange(invalidState(details));
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(() => check(values), [values]);

        return (
            <div className={styles.fileUploadQuestion}>
            <div className={styles.questionField}>
                <span className={styles.description}>{t("Type of files")}</span>
                <Dropdown
                    error={!values.filesType}
                    className={styles.inputField} name="filesType" selection placeholder={t("Choose file type")}
                    options={options} value={values.filesType}
                    onChange={(e, data) => {
                        onValueChange(validState({
                            ...values,
                            filesType: data.value as string
                        }));
                    }}
                />
                <div className={styles.errorMessage}>
                    <ErrorMessage name={"filesType"} />
                </div>
            </div>
            <QuestionField
                text={t("Maximum number of files")} name={"filesNumber"} type={"number"}
                inputProps={{min: 1, max: 10}} value={values.filesNumber}
                onChange={(e, data) => {
                    check({
                            ...values,
                            filesNumber: Number(data.value)
                        });
                }}
            />
            <QuestionField
                text={t("Maximum files size")} name={"filesSize"} type={"number"}
                inputProps={{min: 1}}
                value={values.filesSize}
                onChange={(e, data) => {
                    check({
                        ...values,
                        filesSize: Number(data.value)
                    });
                }}
            />
            </div>
        );
    };

export default FileUploadQuestion;
