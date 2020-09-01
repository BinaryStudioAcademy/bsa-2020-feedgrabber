import React from "react";
import {IAppState} from "../../../../models/IAppState";
import {
    chooseCompanyRoutine,
    dropCompanyRoutine,
    loadCompaniesRoutine} from "../../../../sagas/companies/routines";
import {connect, ConnectedProps} from "react-redux";
import {Formik} from "formik";
import * as yup from 'yup';
import Typography from "../Typography/index";
import Input from "../Input/index";
import styles from './styles.module.sass';
import Button from "../Button";
import {Grid, Header, Icon, Message, Segment, Button as SemanticButton} from "semantic-ui-react";
import {useTranslation} from "react-i18next";

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Email must be valid")
        .required("Email must be valid")
});
const initialValues = {
    email: ''
};

const CompanySelectorForm: React.FC<CompanySelectorFormProps & { className: string }> =
    ({
         className,
         isLoading,
         companiesList,
         company,
         loadCompanies,
         chooseCompany,
         dropCompany
     }) => {
        const [ t ] = useTranslation();

        const companies = !companiesList ? null
            : companiesList.length === 0 ? <Message color='blue'>{t("No companies found. Create your own :)")}</Message>
                : companiesList.map(
                    (company, index) => (
                        <Segment key={index}>
                            <Grid>
                                <Grid.Column width={4}>
                                    <SemanticButton type='button'
                                                    icon
                                                    basic
                                                    size='small' onClick={() => chooseCompany(company)}>
                                        <Icon name='arrow right' inverted color='red' size='large'/>
                                    </SemanticButton>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Header textAlign='left' as='h4' className={styles.company}>
                                        {company.name}
                                    </Header>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    ));
        const content = isLoading ? (<Icon loading size='big' name='spinner'/>) : companies;
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    loadCompanies(values.email);
                }}
            >
                {formik => {
                    const errorText = formik.touched.email && formik.errors.email;
                    return (
                        <form onSubmit={formik.handleSubmit} className={className} autoComplete='off'>
                            <Typography fontWeight="bold" variant="h4">{t("Sign In")}</Typography>
                            <Typography variant="body2">{t("Enter Email to get your companies")}</Typography>
                            <Input name="email"
                                   disabled={!!companiesList}
                                   placeholder="Email"
                                   value={formik.values.email}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                            />
                            <div className={styles.companiesContainer}>
                                {content}
                            </div>
                            {
                                errorText && <Message attached="top" error size="small" content={errorText}/>
                            }
                            {!companiesList ? (
                                    <Button variant='secondary'
                                            type='submit'
                                            marginTop='1.17rem'>
                                        {t("Log in")}
                                    </Button>)
                                : (<Button variant='secondary'
                                           type='button'
                                           onClick={() => {
                                               formik.setFieldValue('email', '');
                                               dropCompany();
                                           }}
                                           marginTop='1.17rem'>
                                    {t("Change email")}
                                </Button>)
                            }

                        </form>
                    );
                }}
            </Formik>
        );

    };

const mapStateToProps = (state: IAppState) => ({
    isLoading: state.company.isLoading,
    companiesList: state.company.list,
    company: state.company.currentCompany
});

const mapDispatchToProps = {
    loadCompanies: loadCompaniesRoutine,
    chooseCompany: chooseCompanyRoutine,
    dropCompany: dropCompanyRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type CompanySelectorFormProps = ConnectedProps<typeof connector>;

export default connector(CompanySelectorForm);
