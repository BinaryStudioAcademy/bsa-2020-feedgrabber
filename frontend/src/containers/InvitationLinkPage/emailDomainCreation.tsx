import React from 'react';
import { setEmailDomainRoutine } from 'sagas/companies/routines';
import { connect } from 'react-redux';
import { ICompanyDomain } from 'models/companies/ICompanyDomain';
import UICard from 'components/UI/UICard';
import UICardBlock from 'components/UI/UICardBlock';
import { Input } from 'semantic-ui-react';
import UIButton from 'components/UI/UIButton';
import styles from './styles.module.sass';
import { Formik } from 'formik';
import * as yup from 'yup';
import { IAppState } from 'models/IAppState';

interface IDomainCreationBlockProps {
    company?: ICompanyDomain;
    setCompanyDomain?(action: {id: string; emailDomain: string}): void;
}

const validationSchema = yup.object().shape({
    emailDomain: yup
      .string()
      .required("Please, write domain name before saving")
  });

const DomainCreationBlock: React.FC<IDomainCreationBlockProps> = ({company, setCompanyDomain}) => {

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

    const componentWithoutDomain = (
        <UICardBlock>
            <Formik
            initialValues={{emailDomain: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSave}
            >
                {formik => 
                    <form>
                        Write company email domain name <i>(e.g. binary-academy) </i>
                        <br/>
                    <Input id="emailDomain"
                        name="emailDomain"
                        icon='at' 
                        iconPosition='left' 
                        placeholder='Write domain...' 
                        onChange={formik.handleChange}
                        onBlure={formik.handleBlur}/>
                    {formik.errors.emailDomain && <div>{formik.errors.emailDomain}</div>}
                    <br/>
                    <UIButton 
                        title="Save" 
                        onClick={formik.handleSubmit} 
                        submit/>
                    </form>
                }
            </Formik>
        </UICardBlock>
    );

    const componentWithDomain = (
        <UICardBlock>
            <span className={styles.info}>Now you can tell employees that they can sign up on <br/>
            <a href={`${company?.subdomainName}.feedgrabber.com`}> {company?.subdomainName}.feedgrabber.com </a><br/>
            using this pattern: <code>username@{company?.emailDomain}</code></span>
            <br/>
            <UIButton title="Delete" onClick={handleDelete}/>
        </UICardBlock>
    );

    return (
        <UICard>
            <UICardBlock>
                <h3>Domain name for corporate email</h3>
            </UICardBlock>
            {company?.emailDomain === null ? componentWithoutDomain : componentWithDomain }
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