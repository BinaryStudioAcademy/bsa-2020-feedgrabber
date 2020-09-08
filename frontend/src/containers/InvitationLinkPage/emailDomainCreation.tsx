import React, { useState } from 'react';
import { setEmailDomainRoutine } from 'sagas/companies/routines';
import { connect } from 'react-redux';
import { ICompanyDomain } from 'models/companies/ICompanyDomain';
import UICard from 'components/UI/UICard';
import UICardBlock from 'components/UI/UICardBlock';
import { Input, Modal } from 'semantic-ui-react';
import UIButton from 'components/UI/UIButton';
import styles from './styles.module.sass';
import { Formik } from 'formik';
import * as yup from 'yup';
import { IAppState } from 'models/IAppState';
import {env} from "../../env";
import { useTranslation } from "react-i18next";

interface IDomainCreationBlockProps {
    company?: ICompanyDomain;
    setCompanyDomain?(action: {id: string; emailDomain: string}): void;
}

const validationSchema = yup.object().shape({
    emailDomain: yup
      .string()
      .required("Please, write domain name before saving")
      .matches(/^(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/,
      "Enter valid domain name")
  });

const DomainCreationBlock: React.FC<IDomainCreationBlockProps> = ({company, setCompanyDomain}) => {
    const [t] = useTranslation();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleSave = values => {
        const payload = {
            id: company.id,
            emailDomain: values.emailDomain
        };
        setCompanyDomain(payload);
    };

    const handleDelete = () => {
        const payload = {
            id: company.id,
            emailDomain: null
        };
        setCompanyDomain(payload);
    };

    const confirmationModal = () => {
        return (<Modal
            size="tiny"
            open={showConfirmationModal}
            closeOnDimmerClick
            onClose={() => setShowConfirmationModal(false)}
        >
            <Modal.Header>
                {t("Do you really want to delete current email domain?")}
                {t("Employees won`t able to register with there corporate emails anymore")}
            </Modal.Header>
            <Modal.Actions>
                <UIButton title={t("Yes")}
                        onClick={() => {
                            setShowConfirmationModal(false);
                            handleDelete();
                        }}/>
                <UIButton title={t("No")} submit onClick={() => setShowConfirmationModal(false)}/>
            </Modal.Actions>
        </Modal>);
    };

    const componentWithoutDomain = (
        <UICardBlock>
            <Formik
            initialValues={{emailDomain: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSave}
            >
                {formik => 
                    <form>
                        {t("Write company email domain name (e.g. binary-academy.com)")}
                        <br/>
                    <Input id="emailDomain"
                        name="emailDomain"
                        icon='at' 
                        fluid
                        iconPosition='left' 
                        placeholder={t('Write domain...')}
                        onChange={formik.handleChange}
                        />
                    {formik.errors.emailDomain && <div>{formik.errors.emailDomain}</div>}
                    <UIButton 
                        title={t("Save")}
                        onClick={formik.handleSubmit} 
                        submit/>
                    </form>
                }
            </Formik>
        </UICardBlock>
    );

    const getLink = () => {
        const {hostname} = window.location;
        if (hostname.split(".").pop() === 'localhost') {
            const fullNewHostName = env.basePort
            ? hostname + ':' + env.basePort
            : hostname;
            return fullNewHostName;
        }
        return hostname;
    };

    const componentWithDomain = (
        <UICardBlock>
            <span className={styles.info}>{t("Now you can tell employees that they can sign up on")} <br/>
            <a href={getLink()}> 
            {getLink()} </a><br/>
            {t("using there corporate email")}: <code>@{company?.emailDomain}</code></span>s
            <br/>
            <UIButton title={t("Delete")} onClick={() => setShowConfirmationModal(true)}/>
        </UICardBlock>
    );

    return (
        <UICard>
            <UICardBlock>
                <h3>{t("Domain name for corporate email")}</h3>
            </UICardBlock>
            {company?.emailDomain === null ? componentWithoutDomain : componentWithDomain }
            {confirmationModal()}
        </UICard>
    );
};

const mapStateToProps = (state: IAppState) => ({
    company: state.company.currentCompany
});

const mapDispatchToProps = {
    setCompanyDomain: setEmailDomainRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(DomainCreationBlock);
