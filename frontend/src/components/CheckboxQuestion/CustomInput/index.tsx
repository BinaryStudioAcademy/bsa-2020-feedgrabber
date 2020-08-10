import React from "react";

import styles from './styles.module.sass';

const CustomInput: React.FunctionComponent<any> =
    ({
         disabled,
         type,
         placeholder,
         name,
         value,
         error,
         onChange,
         onBlur
     }) => (
        <div className={styles.field}>
            <input
                className={styles.input}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            {error ? <div className={styles.line + " " + styles.error}/> : <div className={styles.line}/>}
        </div>
    );

export default CustomInput;