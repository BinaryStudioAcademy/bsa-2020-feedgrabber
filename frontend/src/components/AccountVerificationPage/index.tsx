import React, { useState, useEffect } from "react";
import apiClient from "../../helpers/apiClient";
import { Link, useParams } from "react-router-dom";
import { useAuth } from '../../security/authProvider';

import styles from './style.module.sass';

const AccountVerificationPage = () => {
  const isLogged = useAuth();
  const { id: token } = useParams();
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    if (result !== undefined) {
      return;
    }
    apiClient.post(`http://localhost:5000/api/auth/register/confirm?token=${token}`)
      .then(res => {
        setResult(true);
      }).catch(err => {
        setResult(false);
      });
  });

  return (
    <div className={styles.account_verification_page}>
      <h3>Account verification</h3>
      {result === undefined && <span>Loading...</span>}
      {result === false && <span>Your account already activated or you use a bad link.</span>}
      {result === true && <span>Account activated!</span>}
      {isLogged
        ? <Link to="/" className={styles.account_verification_page_link}>Go to main page...</Link>
        : <Link to="/auth" className={styles.account_verification_page_link}>Login...</Link>}
    </div>
  );
};

export default AccountVerificationPage;
