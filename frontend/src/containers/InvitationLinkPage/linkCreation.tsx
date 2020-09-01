import React, {useRef} from "react";
import * as yup from 'yup';
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import {Formik} from "formik";
import UIButton from "../../components/UI/UIButton";
import {useTranslation} from "react-i18next";

interface IInvitationBlockProps {
  isLoading?: boolean;
  responseError?: string;

  sendInvitation(email: string): void;
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
});

const InvitationCreationBlock: React.FunctionComponent<IInvitationBlockProps> = (
  {
    isLoading,
    responseError,
    sendInvitation
  }
) => {
  const [t] = useTranslation();
  const emailInput = useRef(null);

  const onSubmit = values => {
    sendInvitation(values.email);
    values.email = '';
  };

  return (
    <UIColumn wide>
      <UICard>
        <UICardBlock>
          <h3>{t("Send New Invitation")}</h3>
        </UICardBlock>
        <UICardBlock>
          <Formik
            initialValues={{email: ''}}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit
              }) => {
              const error = errors.email || responseError;
              return (
                <form onSubmit={handleSubmit}>
                  <label>Email</label>
                  <input
                    id="email"
                    name="email"
                    placeholder={t("Invitation email")}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    ref={emailInput}
                  />
                  {error && <div>{error}<br/><br/></div>}
                  <UIButton
                    title={t("Send")}
                    onClick={handleSubmit}
                    submit
                    loading={isLoading}
                    disabled={isLoading}
                  />
                </form>
              );
            }}
          </Formik>
        </UICardBlock>
      </UICard>
    </UIColumn>
  );
};

export default InvitationCreationBlock;
