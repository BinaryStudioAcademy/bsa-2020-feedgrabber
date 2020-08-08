import React from "react";
import {useField} from "formik";
import styles from "../styles.module.sass";

interface IRegistrationFieldData {
    label: string;
    name: string;
    type: string;
}

const RegistrationField: React.FC<IRegistrationFieldData> = (data: IRegistrationFieldData) => {
    const [field, meta] = useField(data.name);
    return (
        <div className={styles.registrationField}>
           <label htmlFor={data.name}>{data.label}</label>
           <input {...field} {...data} />
            {meta.touched && meta.error ? (
                <div className={styles.validationMessage}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default RegistrationField;
