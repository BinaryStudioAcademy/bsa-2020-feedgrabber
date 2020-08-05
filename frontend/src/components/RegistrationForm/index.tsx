import React, {useState} from "react";
import styles from './styles.module.sass';
import {register} from "./actions";
import { connect } from "react-redux";
import {IRegistrationRequest} from "./IRegistrationRequest";

const RegistrationPage = ({ register }) => {

    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email: string): boolean => {
        const emailRegExp = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*' +
            '@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?');

        const validationMessage = document.getElementById("email-validation");
        if (emailRegExp.test(email)) {
            validationMessage.style.display = "none";
            return true;
        } else {
            validationMessage.style.display = "block";
            return false;
        }
    };

    const validatePassword = (password: string): boolean => {
        const validationMessage = document.getElementById("password-validation");

        if (password.length <= 6) {
            validationMessage.textContent = "Use 6 characters or more for your password";
            validationMessage.style.display = "block";
            return false;
        }

        if (!password.match(/[a-z]/)) {
            validationMessage.textContent = "Password must contain at least 1 lower case letter";
            validationMessage.style.display = "block";
            return false;
        }

        if (!password.match(/[A-Z]/)) {
            validationMessage.textContent = "Password must contain at least 1 upper case letter";
            validationMessage.style.display = "block";
            return false;
        }

        if (!password.match(/[0-9]/g)) {
            validationMessage.textContent = "Password must contain at least 1 digit";
            validationMessage.style.display = "block";
            return false;
        }

        /* if (!password.match(/[^a-zA-Z\d]/g)) {
            validationMessage.textContent = "Password must contain at least 1 special symbol";
            validationMessage.style.display = "block";
            return false;
        }*/

        validationMessage.style.display = "none";
        return true;
    };

    const validateCompany = (companyName: string): boolean => {
        const validationMessage = document.getElementById("company-validation");

        if (!companyName) {
            validationMessage.style.display = "block";
            return false;
        } else {
            validationMessage.style.display = "none";
            return true;
        }
    };

    const onRegistrationSubmit = async() => {
        const isEmailValid = validateEmail(email);
        const isCompanyValid = validateCompany(companyName);
        const isPasswordValid = validatePassword(password);

        if (!(isEmailValid && isCompanyValid && isPasswordValid)) {
            return;
        }

        const request: IRegistrationRequest = {
            email,
            companyName,
            password
        };
        register(request);
    };

    return (
        <div className={styles.registrationPage}>
            <div className={styles.registrationForm}>
              <div className={styles.registrationField + " email"}>
                <div>Email</div>
                <input type="text"
                       onChange={e => setEmail(e.target.value)}
                       onBlur={() => validateEmail(email)}
                />
                <div id="email-validation" className={styles.validationMessage}>Email not valid</div>
              </div>
              <div className={styles.registrationField + " companyName"}>
                <div>Company name</div>
                <input type="text"
                       onChange={e => setCompanyName(e.target.value)}
                       onBlur={() => validateCompany(companyName)}
                />
                <div id="company-validation" className={styles.validationMessage}>Enter company name</div>
              </div>
              <div className={styles.registrationField + " password"}>
                <div>Password</div>
                <input type="password"
                       onChange={e => setPassword(e.target.value)}
                       onBlur={() => validatePassword(password)}
                />
                <div id="password-validation" className={styles.validationMessage} />
              </div>
              <button type="button" onClick={onRegistrationSubmit}>Register</button>
              <p className={styles.message}>Already registered?  <a href="#">Sign In</a></p>
            </div>
        </div>
    )
};

const mapDispatchToProps = {
  register
};

export default connect(null, mapDispatchToProps)(RegistrationPage);
