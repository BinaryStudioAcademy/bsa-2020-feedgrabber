import {register} from "./actions";
import {connect} from "react-redux";
import styles from "./styles.module.sass";
import React from "react";
import RegistrationField from "./registrationField";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {IRegistrationRequest} from "./IRegistrationRequest";
import {Link} from "react-router-dom";

const registrationValidationSchema = Yup.object({
    email: Yup.string()
        .required('Enter email')
        .email("Email not valid"),
    companyName: Yup.string()
        .required("Enter company name"),
    password: Yup.string()
        .min(6, "Use 6 characters or more for your password")
        .matches(/[a-z]/, "Password must contain at least 1 lower case letter")
        .matches(/[A-Z]/, "Password must contain at least 1 upper case letter")
        .matches(/[0-9]/, "Password must contain at least 1 digit")
        .required('Enter password')
});

const RegistrationForm = ({register}) => {
    return (
        <Formik
            initialValues={{
                email: '',
                companyName: '',
                password: ''
            }}
            validationSchema={registrationValidationSchema}
            onSubmit={async values => {
                const request: IRegistrationRequest = {
                    email: values.email,
                    companyName: values.companyName,
                    password: values.password
            };
            register(request);
        }}>
             <div className={styles.registrationPage}>
                <Form className={styles.registrationForm}>
                    <RegistrationField label="Email" name="email" type="email" />
                    <RegistrationField label="Company name" name="companyName" type="text" />
                    <RegistrationField label="Password" name="password" type="password" />
                    <button type="submit">Register</button>
                    <p className={styles.message}>Already registered?
                        <Link to="/login">Sign In</Link>
                    </p>
                </Form>
             </div>
        </Formik>
    );
};

const mapDispatchToProps = {
    register
};

export default connect(null, mapDispatchToProps)(RegistrationForm);
