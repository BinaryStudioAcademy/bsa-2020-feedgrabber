import React, {useState} from "react";
import styles from './styles.module.sass';
import {register} from "./actions";
import { connect } from "react-redux";
import {IRegistrationRequest} from "./IRegistrationRequest";

const RegistrationPage = ({ register }) => {

    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [password, setPassword] = useState('');

    const handleUserInput = (body: string, fieldName: string) => {
        switch (fieldName) {
            case "email":
                setEmail(body);
                break;
            case "companyName":
                setCompanyName(body);
                break;
            case "password":
                setPassword(body);
                break;
        }
    };

    const onRegistrationSubmit = async() => {
        const emailRegExp = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*' +
            '@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?');

        if (!emailRegExp.test(email.toLowerCase()) || !companyName || !password) {
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
            <div className={styles.registerForm}>
              <div>Email</div>
              <input type="text" onChange={e => handleUserInput(e.target.value, "email")}/>
              <div>Company name</div>
              <input type="text" onChange={e => handleUserInput(e.target.value, "companyName")}/>
              <div>Password</div>
              <input type="password" onChange={e => handleUserInput(e.target.value, "password")}/>
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
