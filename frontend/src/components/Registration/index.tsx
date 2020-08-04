import React from "react";
import styles from './styles.module.sass';

const SignUp = () => {
  return (
      <div className={styles.signUpPage}>
        <div className={styles.form}>
            <form className={styles.registerForm}>
              <div>Email</div>
              <input type="text" />
              <div>Username</div>
              <input type="text" />
              <div>Company name</div>
              <input type="text" />
              <div>Password</div>
              <input type="password" />
              <button>Register</button>
              <p className={styles.message}>Already registered?  <a href="#">Sign In</a></p>
            </form>
        </div>
      </div>
  )
};

export default SignUp;
