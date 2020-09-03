import React, { useState, useEffect } from "react";
import apiClient from "../../helpers/apiClient";
import { Link, useParams } from "react-router-dom";
import { useAuth } from '../../security/authProvider';

import styles from './style.module.sass';
import {useTranslation} from "react-i18next";

const AccountVerificationPage = () => {
  const isLogged = useAuth();
  const { id: token } = useParams();
  const [result, setResult] = useState(undefined);
  const [ t ]  = useTranslation();

  useEffect(() => {
    if (result !== undefined) {
      return;
    }
    apiClient.post(`/api/auth/register/confirm?token=${token}`)
      .then(res => {
        setResult(true);
      }).catch(err => {
        setResult(false);
      });
  });

  return (
    <div className={styles.account_verification_page}>
      <h3>{t("Account verification")}</h3>
      {result === undefined && <span>{t("Loading...")}</span>}
      {result === false && <span>{t("Your account already activated or you use a bad link.")}</span>}
      {result === true && <span>{t("Account activated!")}</span>}
      {isLogged
        ? <Link to="/" className={styles.account_verification_page_link}>{t("Go to main page...")}</Link>
        : <Link to="/auth" className={styles.account_verification_page_link}>{t("Login...")}</Link>}
    </div>
  );
};

export default AccountVerificationPage;
